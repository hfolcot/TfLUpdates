class Map {
    #map;
    constructor() {
        this._loadMap();
    }
    _loadMap() {
        this.#map = L.map('map').setView([51.505, -0.09], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

    }
    _addMarker(item) {
        const popupOptions = {
            className: item.severity.toLowerCase(),
        }
        L.marker(JSON.parse(item.point).reverse()).addTo(this.#map)
            .bindPopup(`${item.corridorIds[0].toUpperCase()}<br/>${item.comments}<br />${item.severity}`, popupOptions)
            .openPopup();
    }
}

export default new Map();