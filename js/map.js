const map = L.map('map').setView([52.5865, -2.1280], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//create a custom icon for entrances
const entranceIcon = L.divIcon({
  className: "custom-entrance",
  html: "🚪", //change emoji later
  iconSize: [30, 30]
});

//add a marker for Alan Turing Building
L.marker([52.5868, -2.1279], { icon: entranceIcon })
  .addTo(map)
  .bindPopup("Main Entrance - Alan Turing Building");