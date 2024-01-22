import * as mapboxgl from "mapbox-gl";
import { MapboxSearchBox, autofill } from "@mapbox/search-js-web";
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN!;
function initMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [-58.5626883, -34.4418013], // starting position [lng, lat]
    zoom: 12, // starting zoom
  });
  const search = new MapboxSearchBox();
  search.accessToken = MAPBOX_TOKEN;
  search.options = {
    language: "es",
    country: "ar",
  };
  let data = {
    lng: 0,
    lat: 0,
  };
  search.addEventListener("retrieve", (event) => {
    event.preventDefault();
    const [lng, lat] = event.detail.features[0].geometry.coordinates;
    data.lng = lng;
    data.lat = lat;
  });
  search.mapboxgl = mapboxgl;
  search.marker = true;
  map.addControl(search);
  return data;
}
export { initMap };
