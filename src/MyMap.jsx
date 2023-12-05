import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { MapContainer, useMap, TileLayer } from "react-leaflet";
import { useEffect } from "react";

const SearchField = ({ apiKey }) => {
  const provider = new MapBoxProvider({
    params: {
      access_token: apiKey,
    },
  });

  const searchControl = new GeoSearchControl({
    provider: provider,
    searchLabel: "Insira o endereço",
    notFoundMessage: 'Endereço não encontrado. Tente novamente.',
    style: 'bar'
    //keepResult: true
  });

  const map = useMap();
  map.setView([-8.0456, -34.8981], 10);
  
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

const MyMap = () => {
  // ...
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
