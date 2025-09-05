let map; 
let marker;

function showMap(lat, lon, locationName) {
  if (!map) {
    map = L.map('map').setView([lat, lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  } else {
    map.setView([lat, lon], 10);
  }

  if (marker) {
    marker.remove();
  }

  marker = L.marker([lat, lon]).addTo(map)
    .bindPopup(`<b>${locationName}</b>`).openPopup();
}
