import "leaflet/dist/leaflet.css";
import MapDemoLeaftlet from "./MapDemoLeaflet";
import MapDemoGoogle from "./MapDemoGoogle";
import { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from 'leaflet';

const MapWithGeocodeDemo = () => {

  const map = useMap();

  map.setView([-8.0456, -34.8981], 10);

  let options = {
    key: 'cb6e10c7912248faa17286f46bf9c721',
    limit: 10,
    proximity: '-8.0456, -34.8981' //proximity: '51.52255, -0.10249' // favour results near here
  };

  let control = L.Control.openCageGeocoding(options).addTo(map);

  const TileApiKey = import.meta.env.VITE_APP_THUNDERFOREST_API_KEY;
  L.tileLayer('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}{r}.png?apikey=' + TileApiKey, {
    attribution: 'Data <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Map tiles &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>',
    minZoom: 4,
    maxZoom: 18
  }).addTo(map);

  return;
}

export default function MapDemo() {
  return (
    <>
      <div className="flex gap-4 justify-center items-center h-screen">
        {/* <MapDemoLeaftlet />
        <MapDemoGoogle /> */}

        <MapContainer
          //center={boundsCenter}
          zoom={10}
          style={{ height: "60vh", width: "60vh" }}
        >
          <MapWithGeocodeDemo />
        </MapContainer >
      </div>
    </>
  );
}
