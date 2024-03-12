import React, {useState, useEffect} from "react";
import Head from "src/layout/head/Head";
import Content from "src/layout/content/Content";

import { Card } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, Row, Col, BlockBetween, Map } from "src/components/Component";
import api from "src/api";
import { closeConnection, connectAndSubscribe, publishMessage } from "src/utils/mqtt";

const Homepage = () => {

  const [companies, setCompanies] = useState([])
  const [machines, setMachines] = useState([])

  const [locations, setLocations] = useState([])
  const [heartBeatAsked, setHeartBeatAsked] = useState(false)
  const [awsConnected, setAwsConnected] = useState(false)

  const [wildcardTopic, setWildcardTopic] = useState("")
  const [client, setClient] = useState(null)
  const [intervalStarted, setIntervalStarted] = useState(false)

  useEffect(() => {
    api.get("/Company").then(res => {
      setCompanies(res.data)
    })
    api.get("/Machine").then(res => {
      setMachines(res.data)
    })
  },[])

  useEffect(() => {
    if (companies.length > 0 && machines.length > 0)
    {
      // let regex = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
      let regex = /^(-?(?:90(?:\.0{1,6})?|(?:[0-8]?\d(?:\.\d{1,6})?)))\s*,\s*(-?(?:180(?:\.0{1,6})?|(?:1[0-7]\d|0?\d{1,2})(?:\.\d{1,6})?))$/;
      let locations = []
      for (let mch of machines){
        let location = [31.4726215, 74.4058258]
        let mc = mch.machineConfiguration 
        if (mc && regex.test(mc.location)){
          location = mc.location.split(",").map((value) => parseFloat(value.trim()));
        }
        else{
          for (let comp of companies){
            if ((comp.companyId === mch.companyId && (regex.test(comp.location)))){
              location = mc.location.split(",").map((value) => parseFloat(value.trim()));
              break
            }
          }
        }
        locations.push({companyId: mch.companyId, beat_count: 3, last_time: new Date(), coord: location, active: false, pending: true, machineCode: mch.machineCode, data: ["Machine Code: " + mch.machineCode, "Machine Name: " + mch.machineName] })
      }
      setLocations(locations)
      console.log("Setting Locations", locations)
      setHeartBeatAsked(false)
    }
  }, [companies, machines])

  useEffect(() => {
    const changeMachineStatus = (machineId, online = true) => {
      setLocations(prevLocations => {
        const updatedLocations = prevLocations.map(obj => {
          if (obj.machineCode === machineId) {
            return { ...obj, active: online, last_time: new Date(), beat_count: obj.beatCount - 1 };
          }
          return obj;
        });
        return updatedLocations;
      });
    };

    const messageReceived = (msg) => {
      let result = msg.split(':');
      let reg = /[A-Z0-9]{5}/g
      if (result.length > 1 && result[1].match(reg)) {
        changeMachineStatus(result[1])
      }


      console.log("**New Message:", msg, result, new Date())
    }
    const connect = async () => {
      let company_topic = "BEAT/#"
      console.log("================================================================", company_topic)
      setWildcardTopic(company_topic)

      let client = await connectAndSubscribe(company_topic, messageReceived, setAwsConnected);
      setClient(client);
      setHeartBeatAsked(false);
    }
    const startUp = async () => {
      setAwsConnected(true)
      setTimeout(connect, 1000);
    }
    if (locations.length > 0 && !awsConnected){
      startUp()
    }
  }, [awsConnected, locations])

  useEffect(() => {
    return () => {
      if (client !== null) {
        closeConnection(client)
      }
    }
  }, [client])

  useEffect(() => {
    const checkAndCallFunction = () => {
      console.log("^^^^^  ^^^^^ Check and Call function Called.");
      locations.forEach(loc => {
        const currentTime = new Date();
        if (loc.beat_count > 0 && ((currentTime.getTime() - loc.last_time.getTime()) > ((5 * 60 * 1000)-1000)) && loc.active)
        {
          console.log(loc.machineCode," ", loc.beat_count, " ", (currentTime.getTime() - loc.last_time.getTime())/(60*1000));
            setLocations(prevLocations => {
              const updatedLocations = prevLocations.map(obj => {
                if (obj.machineCode === loc.machineCode) {
                  return { ...obj, active: false };
                }
                return obj;
              });
              return updatedLocations;
            });

        }
        else if (loc.beat_count < 1)
          setHeartBeatAsked(false)


      });
    }

    if (locations.length > 0)
    {
      console.log("Strating INterval ... ")

      const intervalId = setInterval(checkAndCallFunction, 10 * 1000)
      // setIntervalStarted(true);
      return () => {clearInterval(intervalId); setIntervalStarted(false)}
    }

  }, [locations]);

  useEffect(() => {
    if (companies.length> 0 && locations.length > 0 && client !== null && !heartBeatAsked) {
      let deadMachines = locations.filter((obj) => obj.active === false)
      for (let comp of companies)
      {
        let topic = "BEAT/COMP_"+comp.companyId
        let msg_text = "FROM REACT:"
        for (let mch of deadMachines) {
          if (mch.companyId === comp.companyId)
            msg_text += mch.machineCode + ","
        }
        msg_text = msg_text.slice(0, -1);

        if (msg_text.length > 11)
        {
          publishMessage(client, topic, msg_text)
        }
      }

      setTimeout(() => {
        setLocations(prevLocations => {
          const updatedLocations = prevLocations.map(obj => {
            return { ...obj, pending: false, beat_count: 3 };

          });
          return updatedLocations;
        });
      }, 10000)

      setHeartBeatAsked(true)

    }
  }, [companies,locations, client, heartBeatAsked])

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent></BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col>
              <Card className="card-bordered w-100 h-100">
                {/* <OLMap width="100%" height="60vh" /> */}
                <Map
                  style={{ width: "100%", height: "60vh" }}
                  center={[31.4726215, 74.4058758]}
                  markers={locations}
                  zoom={15}
                />
              </Card>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
