

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
        area["name"="University of Wolverhampton"]->.uni;

        (
        way["building"](area.uni);
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
    const nodes = new Map();


    //store all nodes
    osm_data.elements.forEach(element => {  
        if (element.type === "node") {
            nodes.set(element.id, [element.lon, element.lat]);
        }
    });

  
    //build polygons for each building
    osm_data.elements.forEach(element => { 
        if (element.type === "way" && element.nodes) {

          const coordinates = element.nodes
            .map(id => nodes.get(id)).filter(p => p) //Convert to [lon, lat] format for GeoJSON
            .filter(Boolean) //Remove any undefined nodes

          if (coordinates.length > 2) { 
                // close polygon if not already closed
                if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
                    coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
                    coordinates.push(coordinates[0]);
                }
                //A valid polygon needs at least 3 points
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
                coordinates: [coords]
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
            "fill-extrusion-color": "#001a76",
            "fill-extrusion-height": 20,
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.8
        }
    });
    

});