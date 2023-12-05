import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { MapContainer, useMap, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { marker } from 'leaflet';
import { Geocoder } from 'leaflet-control-geocoder';

const SearchField = ({ apiKey }) => {
  const initialCenter = [-8.0456, -34.8981];
  const map = useMap();
  const [marker, setMarker] = useState(initialCenter);
  map.setView(initialCenter, 10);

  const provider = new MapBoxProvider({
    params: {
      access_token: apiKey,
    },
  });

  const searchControl = new GeoSearchControl({
    provider: provider,
    searchLabel: "Insira o endereço",
    notFoundMessage: 'Endereço não encontrado. Tente novamente.',
    style: 'bar',
    //keepResult: true
  });
  
  map.addEventListener("click", (e) => {
    let mrk = L.marker(e.latlng).addTo(map);
    //mrk.addTo(map);
    setMarker(mrk.getLatLng());
    //mrk.remove()
    // remova o marker antes de settar um novo
    //marker.removeFrom(map);
    //let mrk = L.marker(e.latlng).addTo(map);
    //setMarker(() => mrk);
    //console.log(mrk._latlng)
  })
  // Geocoder
  //let geocoder = new Geocoder({ defaultMarkGeocode: false })
  //  .on('markgeocode', function (e) {
  //    let marker = L.marker(e.geocode.center).addTo(map);
  //    map.fitBounds(marker.getBounds());
  //  }).addTo(map);


  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};


const MyMap = () => {

  return (
    <MapContainer style={{ height: "60vh", width: "60vh" }}>
      {/* {showSearch && <SearchField apiKey={import.meta.env.VITE_APP_MAPBOX_GEOSEARCH_API_TOKEN} />} */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      /* style={{minHeight:"50vh", display:"block", margin:"15px 0px 15px 10px"}} */
      >
        <SearchField
          apiKey={import.meta.env.VITE_APP_MAPBOX_GEOSEARCH_API_TOKEN}
        />
      </form>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MyMap;
