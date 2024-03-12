import { mqtt5, auth, iot } from 'aws-iot-device-sdk-v2';
import { once } from 'events';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
// import { CognitoIdentityCredentials } from '@aws-sdk/credential-provider-cognito-identity/dist-types/fromCognitoIdentity';
import { toUtf8 } from '@aws-sdk/util-utf8-browser';

function log(msg) {
    let now = new Date();
    // document.getElementById('message').innerHTML += `<pre>${now.toString()}: ${msg}</pre>`;
    console.log(`${msg} - ${now.toString()}`)
}

class AWSCognitoCredentialsProvider extends auth.CredentialsProvider {
    constructor(options, expire_interval_in_ms) {
        super();
        this.options = options;

        setInterval(async () => {
            await this.refreshCredentials();
        }, expire_interval_in_ms ?? 3600 * 1000);
    }

    async refreshCredentials() {
        log('Fetching Cognito credentials');
        this.cachedCredentials = await fromCognitoIdentityPool({
            identityPoolId: this.options.IdentityPoolId,
            clientConfig: { region: this.options.Region },
        })();
    }

    getCredentials() {
        return {
            aws_access_id: this.cachedCredentials?.accessKeyId ?? '',
            aws_secret_key: this.cachedCredentials?.secretAccessKey ?? '',
            aws_sts_token: this.cachedCredentials?.sessionToken,
            aws_region: this.options.Region,
        };
    }
}

function createClient(provider, message_receive_func, setAwsStatus) {
    let wsConfig = {
        credentialsProvider: provider,
        region: process.env.REACT_APP_AWS_REGION,
    };

    let builder = iot.AwsIotMqtt5ClientConfigBuilder.newWebsocketMqttBuilderWithSigv4Auth(process.env.REACT_APP_AWS_IOT_ENDPOINT, wsConfig);

    let client = new mqtt5.Mqtt5Client(builder.build());

    client.on('error', (error) => {
        log('Error event: ' + error.toString());
    });

    client.on('messageReceived', (eventData) => {
        // log('Message Received event: ' + JSON.stringify(eventData.message));
        if (eventData.message.payload) {
            let rawMessage = JSON.parse(toUtf8(eventData.message.payload)).message;
            let reg = /^FROM\sMACHINE:.+$/
            if (reg.test(rawMessage)){
                message_receive_func(rawMessage)
            }
            // let now = new Date();

            // log(' Messsage Received with payload: ' + toUtf8(eventData.message.payload)+now.toString());
            // document.getElementById('message').innerHTML += `<pre>${now.toString()}: ${toUtf8(eventData.message.payload)}</pre>`;

        }
    });

    client.on('attemptingConnect', (eventData) => {
        log('Attempting Connect event');
    });

    client.on('connectionSuccess', (eventData) => {
        log('Connection Success event');
        // log('Connack: ' + JSON.stringify(eventData.connack));
        // log('Settings: ' + JSON.stringify(eventData.settings));
    });

    client.on('connectionFailure', (eventData) => {
        log('Connection failure event: ' + eventData.error.toString());
        setAwsStatus(false)
    });

    client.on('disconnection', (eventData) => {
        log('Disconnection event: ' + eventData.error.toString());
        if (eventData.disconnect !== undefined) {
            log('Disconnect packet: ' + JSON.stringify(eventData.disconnect));
        }
        setAwsStatus(false)
    });

    client.on('stopped', (eventData) => {
        log('#### Stopped event');
        // setAwsStatus(false)
    });

    return client;
}


async function connectAndSubscribe(topic_name, message_receive_func, setAwsStatus) {
    const provider = new AWSCognitoCredentialsProvider({
        IdentityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
        Region: process.env.REACT_APP_AWS_REGION,
    });

    await provider.refreshCredentials();

    const mqttClient = createClient(provider, message_receive_func, setAwsStatus);
    // setClient(mqttClient);

    const attemptingConnect = once(mqttClient, 'attemptingConnect');
    const connectionSuccess = once(mqttClient, 'connectionSuccess');

    mqttClient.start();

    await attemptingConnect;
    await connectionSuccess;

    const suback = await mqttClient.subscribe({
        subscriptions: [
            { qos: mqtt5.QoS.AtLeastOnce, topicFilter: topic_name },
        ],
    });
    log('Suback result: ' + JSON.stringify(suback));

    return mqttClient;
}

async function publishMessage(client,topic, msg) {
    const publishResult = await client.publish({
        qos: mqtt5.QoS.AtMostOnce,
        topicName: topic,
        payload: {message: msg},
    });

    log('Button Clicked, Publish result: ' + JSON.stringify(publishResult));
}

async function closeConnection(client) {
    const disconnection = once(client, 'disconnection');
    const stopped = once(client, 'stopped');

    client.stop();

    await disconnection;
    await stopped;
}

export { AWSCognitoCredentialsProvider, createClient, connectAndSubscribe, closeConnection, publishMessage }