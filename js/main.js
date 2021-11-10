import map from './map.js'
import { API_URL, APP_ID, APP_KEY } from './config.js'

const getJson = async function (url) {
    try {
        const res = await fetch(url);
        return res.json();

    }
    catch (err) {
        throw new Error(`Something went wrong ${err}`);
    }
};

const processResult = function (data) {
    data.forEach(item => {
        map._addMarker(item);
    })
};

(async function () {
    try {
        const data = await getJson(`${API_URL}/Road?app_id=${APP_ID}&app_key=${APP_KEY}`);
        data.filter(item => {
            return item.statusSeverity === 'Closure';
        }).forEach(async item => {
            const res2 = await getJson(`${API_URL}/Road/${item.id}/Disruption?app_id=${APP_ID}&app_key=${APP_KEY}`);
            processResult(res2);
        })
    }
    catch (err) {
        console.error(`There was an error fetching the data: ${err}`)
    }
})()