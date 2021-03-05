/**
 * on récupère l'api de la météo et on affiche les données, par contre la température je ne comprends pas ce que ca représente
 */
const apiKey = '28637eb5d886efb7cf4812786df36a2a';

let myHeaders = new Headers();
let url = "https://api.openweathermap.org/data/2.5/weather?q=Metz&APPID=" + apiKey;
let options = {
    method: 'GET',
    header: myHeaders,
    mode: 'cors',
    cache: 'default'
};

fetch(url, options)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((response) => {
        console.log(response);

        let div = document.querySelector("#meteo");

        let infos = document.createElement('p');
        let meteo = document.createElement('p');
        infos.innerHTML = 'Circuit de \'' + response.name + '\'';
        meteo.innerHTML = 'Météo : ' + response.weather[0].main + ', ' + response.weather[0].description+ ', température du circuit :' + (response.main.temp - 32) / 1.8000 + ' degrès'
        
        div.appendChild(infos);
        div.appendChild(meteo);
});