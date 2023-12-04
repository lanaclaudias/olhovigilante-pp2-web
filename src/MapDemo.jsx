import "leaflet/dist/leaflet.css";
import MapDemoLeaftlet from "./MapDemoLeaflet";
import MapDemoGoogle from "./MapDemoGoogle";

export default function MapDemo() {
  return (
    <>
      <div className="flex gap-4 justify-center items-center h-screen">
        <MapDemoLeaftlet />
        <MapDemoGoogle />
      </div>
    </>
  );
}
