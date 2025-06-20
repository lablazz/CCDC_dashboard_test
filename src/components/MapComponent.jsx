import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);

  return null; // This component only updates the view
};

const MapComponent = ({ lat, lng }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={15} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]}>
        <Popup>Location: {lat}, {lng}</Popup>
      </Marker>
      <RecenterMap lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default MapComponent;
