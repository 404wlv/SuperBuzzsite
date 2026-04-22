

// -------- setup ---------

const map = createmap();

// -------- functions ---------

const buildingnames = {
    "MB (Rosalind Franklin Building)": "MB",
    "MG Building": "MG",
    "MK (School of Media)": "MK (School of Media)",
    "MH (Mary Seacole Building)": "MH",
    "ML Building": "ML",
    "MH (Arthur Storer Building)": "MN",
    "Art & Design Building": "MK (Art & Design Building)",
    "MM": "MM",
    "MX Building": "MX",
    "Randall Lines House Halls": "Randall Lines House Halls",
    "MC (Millennium City Building)": "MC",
    "MA (Wulfruna Building)": "MA",
    "MD (Ambika Paul Building)": "MD",
    "MI (Alan Turing Building)": "MI",
    "MU (Lord Swraj Paul Building)": "MU",
    "Chaplaincy Centre (MP)": "MP (Chaplaincy)",
}

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
            const osmName = element.tags?.name;
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

            buildings.push({
                coords: coordinates,
                name: osmName
            });
          }
        }
      });
    return buildings;

}

function getBuildingCode(osmName) {
    if (buildingnames[osmName]) {
        return buildingnames[osmName];
    }
    return "UNKNOWN";
}

function getCentroid(coords) {
    let x = 0, y = 0;

    coords.forEach(c => {
        x += c[0];
        y += c[1];
    });

    return [x / coords.length, y / coords.length];
}

function openDrawer(name, code) {
    document.getElementById("drawer-title").innerText = code;
    document.getElementById("drawer-body").innerText = name;

    document.getElementById("drawerRight")
        .classList.remove("translate-x-full");
}

function closeDrawer() {
    document.getElementById("drawerRight")
        .classList.add("translate-x-full");
}

// -- on map load stuff --
map.on("load", async () => {

    const data = await fetchbuildings();
    const buildings = parse_osm_data(data);

    const geojson = {
        type: "FeatureCollection",
        features: buildings.map(b => {
            const override = buildingnames[b.name];

            return {
                type: "Feature",
                properties: {
                    osmName: b.name,
                    code: override || b.name || "UNKNOWN"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [b.coords]
                }
            };
        })
    };

    const centroidGeojson = {
        type: "FeatureCollection",
        features: geojson.features.map(f => ({
            type: "Feature",
            properties: f.properties,
            geometry: {
                type: "Point",
                coordinates: getCentroid(f.geometry.coordinates[0])
            }
        }))
    };

    map.addSource("centroids", {
        type: "geojson",
        data: centroidGeojson
    });

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
   
    map.addLayer({
        id: "building-labels",
        type: "symbol",
        source: "centroids",
        layout: {
            "text-field": ["get", "code"],
            "text-size": 12,
            "text-offset": [0, 1.2],
            "text-anchor": "top"
        },
        paint: {
            "text-color": "#fbeed1",
            "text-halo-color": "#000000",
            "text-halo-width": 2
        }
    });

});

map.on("click", "building-labels", (e) => {

        const feature = e.features[0];

        const name = feature.properties.osmName;
        const code = feature.properties.code;

        openDrawer(name, code);

});

map.on("mouseenter", "building-labels", () => {
    map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "building-labels", () => {
    map.getCanvas().style.cursor = "";
});
