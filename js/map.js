// -------- imports ---------
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as THREE from "three";






// -------- setup ---------

const map = createmap();

// -------- functions ---------


function createmap() 
{
    return new maplibregl.Map({
        container: "map",
        style: "https://tiles.openfreemap.org/styles/liberty", //https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vLh5
        center: [-2.128, 52.586], // Longitude, Latitude  
        zoom: 15,
        pitch: 60, //Tilt the map for a pseudo-3D effect
        bearing: -20, //Rotate the map for a better 3D perspective
        antialias: true //Enable anti-aliasing for smoother 3D rendering
    });
}

async function fetchbuildings() {
    const query = 
    `
      [out:json];
      (
        way["building"](52.5868,-2.1355,52.5905,-2.1220);
      );
      out body;
      >;
      out skel qt;
    `;

    const url = `https://overpass-api.de/api/interpreter`;
    const response = await fetch(url, {
        method: "POST",
        body: query
    });
    return await response.json();
}

function getbbox()
{
   const bounds = map.getBounds();
   return `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
}


function parse_osm_data(osm_data) {
    const buildings = [];
    const nodes = {};

    //store all nodes
    osm_data.elements.forEach(element => {  
        if (element.type === "node") {
            nodes[element.id] = 
            {
              lat: element.lat,
              lon: element.lon
            };
        }
    });

    //build polygons for each building
    osm_data.elements.forEach(element => { 
        if (element.type === "way" && element.nodes) {

          const coordinates = element.nodes
            .map(id => nodes[id]) //Convert to [lon, lat] format for GeoJSON
            .filter(Boolean) //Remove any undefined nodes

          if (coordinates.length > 2) { //A valid polygon needs at least 3 points
            buildings.push(coordinates);
          }
        }
      });
    return buildings;

}




// -- on map load stuff --
map.on("load", async () => {

    const data = await fetchbuildings();
    const buildings = parse_osm_data(data);

    const geojson = {
        type: "FeatureCollection",
        features: buildings.map(coords => ({
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    ...coords.map(p => [p.lon, p.lat]),
                    [coords[0].lon, coords[0].lat] // close the ring
                  ]
                ]
            }
        }))
    };

    map.addSource("buildings", {
        type: "geojson",
        data: geojson
    });
    console.log(geojson);
    map.addLayer({
        id: "buildings-3d",
        type: "fill-extrusion",
        source: "buildings",
        paint: {
            "fill-extrusion-color": "#ff0000",
            "fill-extrusion-height": 20,
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.8
        }
    });

});