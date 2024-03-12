import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const OLMap = (props) => {
    const [map, setMap] = useState();
    const mapElement = useRef();
    const mapRef = useRef();
    mapRef.current = map;

    useEffect(() => {
        const initialMap = new Map({
          target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: [74.3587,31.5204],
                zoom: 5,
            }),
        });
        setMap(initialMap);
    }, []);

    return (
      <div style={{height:props.height,width:props.width}} ref={mapElement} className="map-container" />
    );
}

export default OLMap;