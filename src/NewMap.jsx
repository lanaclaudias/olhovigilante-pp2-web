// Tentar resolver problema de reatividade do mapa com esta implementação desacoplada
// Lembrar de receber como parâmetro uma função para retornar o estado "temp" (vide implementação original em Ocorrencia.jsx) para o componente pai (Ocorrencia).

import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { MapContainer, useMap, TileLayer } from "react-leaflet";
import L from "leaflet";
import centerMarkerIcon from "/centermarker.png";
import dangerMarkerIcon from "/danger-icon.png";


const Map = ({ apiKey }) => {
  const initialCenter = [-8.063153, -34.87114];
  //const centerIcon = new L.Icon({ iconUrl: centerMarkerIcon });

  const map = useMap();
  const [marker, setMarker] = useState(L.marker(initialCenter));
  map.setView(initialCenter, 10);

  if (ocorrencias) {
    let icon = L.icon({
      iconUrl: dangerMarkerIcon,
      iconSize: [30, 30],
      //iconAnchor: [0, 0],
      //popupAnchor: [-3, -76],
      //shadowUrl: 'my-icon-shadow.png',
      //shadowSize: [68, 95],
      //shadowAnchor: [22, 94]
    });
    ocorrencias.map((elem) => {
      if (elem.geolocalizacao && elem.geolocalizacao.length > 10) {
        let latlng = elem.geolocalizacao.split(",");
        //console.log(elem.geolocalizacao.split(','))
        //let ocorrenciaMarker = L.marker(elem.geolocalizacao.split(',')).bindPopUp(elem.categoria.nome).addTo(map);
        L.marker(latlng, { alt: elem.categoria.nome, icon: icon })
          .bindPopup(elem.categoria.nome, {})
          .addTo(map);
        // .bindTooltip(elem.categoria.nome, {permanent: true}).addTo(map);
      }
    });
  }
  const provider = new MapBoxProvider({
    params: {
      access_token: apiKey,
    },
  });

  const searchControl = new GeoSearchControl({
    provider: provider,
    searchLabel: "Insira o endereço",
    notFoundMessage: "Não encontrado. Insira na ordem 'Rua, Bairro, Cidade'.",
    style: "bar",
    //keepResult: true
  });

  // Bug: Marcador inicial não é arrastável
  // fixar ponto flutuante em 7 antes de fazer queries
  //console.log("before drag: ", marker.getLatLng());

  map.on("click", (e) => {
    if (marker) {
      marker.removeFrom(map);
    }

    let mrk = L.marker(e.latlng, { draggable: true, autoPan: true }).on(
      "dragend",
      (e) => {
        mrk.setLatLng(e.target._latlng);
        setMarker(mrk);
        handleTempLatLng(mrk);
        /* console.log("temp after drag ", temp) */
      }
    );
    setMarker(mrk);
    handleTempLatLng(mrk);
    /* console.log("temp after click ", temp) */
  });
  marker.addTo(map);
  map.setView(marker.getLatLng(), 20);
  handleTempLatLng(marker);
  /* console.log("temp after click and drag: ", temp) */

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

const NewMap = () => {
  return (
    <>
      <MapContainer style={{ height: "60vh", width: "60vh" }}>
        <Map apiKey={import.meta.env.VITE_APP_MAPBOX_GEOSEARCH_API_TOKEN} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

export default NewMap;