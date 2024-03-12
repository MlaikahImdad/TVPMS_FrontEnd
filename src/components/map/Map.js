import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const greenIcon = L.icon({
  iconUrl: require("./images/active.png"),
  iconSize: [60, 60],
});

const redIcon = L.icon({
  iconUrl: require("./images/inactive.png"),
  iconSize: [60, 60],
});

const yellowIcon = L.icon({
  iconUrl: require("./images/pending.png"),
  iconSize: [60, 60]
});

const Map = ({ markers, ...props }) => {
  const [center, setCenter] = useState([31.4726215, 74.4058258]);
  const [zoom, setZoom] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    setCenter(calCenter(markers));
    calZoom(markers)
  }, [markers]);

  const calCenter = (objects) => {
    const totalObjects = objects.length;
    let totalLatitude = 0;
    let totalLongitude = 0;

    objects.forEach((obj) => {
      totalLatitude += obj.coord.latitude;
      totalLongitude += obj.coord.longitude;
    });

    const meanLatitude = totalLatitude / totalObjects;
    const meanLongitude = totalLongitude / totalObjects;

    return { latitude: meanLatitude, longitude: meanLongitude };
  };

  const calZoom = (objects) => {
    const bounds = L.latLngBounds();

    objects.forEach((obj) => {
      bounds.extend(obj.coord);
    });
    if (mapRef.current) {
      const map = mapRef.current;
      try{
        map.fitBounds(bounds);
      }catch(e){

      }finally{
        setZoom(map.getZoom());
      }
    }
  };
  return (
    <MapContainer ref={mapRef} zoom={zoom} scrollWheelZoom={false} center={center} {...props}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, key) => {
        return (
          <Marker position={marker.coord} key={key} icon={marker.active ? greenIcon : marker.pending ? yellowIcon: redIcon}>
            <Popup>
              {marker.data.map((dt, kt) => {
                return (
                  <React.Fragment key={kt}>
                    {dt}
                    <br />
                  </React.Fragment>
                );
              })}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
