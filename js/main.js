import map from './map.js'
import { API_URL, APP_ID, APP_KEY } from './config.js'

const choiceMenu = document.getElementById('mapValue');
const infoContainer = document.getElementById('infoContainer');

const insertHtml = function (container, markup) {
    // Add html to container
    container.insertAdjacentHTML('beforeend', markup);
}

const createMarkup = function (item) {
    // Add html for each incident to info container
    let severity = '🟢';
    if (item.severity === 'Severe') {
        severity = '🔴';
    }
    if (item.severity === 'Moderate') {
        severity = '⚠';
    }

    const markup = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">${severity} ${item.corridorIds[0].toUpperCase()}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item.category}</h6>
      <p class="card-text">${item.comments}</p>
    </div>
  </div>`;
    insertHtml(infoContainer, markup);
}

const getJson = async function (url) {
    // Fetch the data and return as JSON
    try {
        const res = await fetch(url);
        return res.json();

    }
    catch (err) {
        throw new Error(`Something went wrong ${err}`);
    }
};

const filterData = function (data, filterBy, filterValue) {
    return data.filter(item => {
        return item[filterBy] === filterValue;
    })
}


const processResult = function (data) {
    data.forEach(item => {
        console.log(item);
        map._addMarker(item);
        createMarkup(item);
    })
};

const getData = async function () {
    try {
        const data = await getJson(`${API_URL}/Road?app_id=${APP_ID}&app_key=${APP_KEY}`);
        const filteredData = filterData(data)
        filteredData.forEach(async item => {
            const res2 = await getJson(`${API_URL}/Road/${item.id}/Disruption?app_id=${APP_ID}&app_key=${APP_KEY}`);
            processResult(res2);
        })
    }
    catch (err) {
        console.error(`There was an error fetching the data: ${err}`)
    }
}

// Event Listeners
window.addEventListener('load', getData);
//choiceMenu.addEventListener('change', getData);