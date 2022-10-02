const AppMap = {};

AppMap.__map;

AppMap.Init = function() {
    AppMap.__map = L.map('_appMap').setView([23.259933, 77.412613], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(AppMap.__map);

};

AppMap.AddMarker = function(_coordinate, _name, _zoom = false) {

    let _marker = L.marker([_coordinate.lat, _coordinate.lon]).addTo(AppMap.__map);
    _marker.bindPopup(_name);

    if(_zoom) {
        AppMap.__map.setView([_coordinate.lat, _coordinate.lon], 10);
    };

};