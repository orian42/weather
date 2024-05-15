//This function will populate the current weather conditions
function displayCurrent() {

}


//This Function will populate the 5-day forecast
function displayForecast() {

}


//This function will render the forecast cards
function renderForecastCards() {

}


//This function will process the search
function citySearch() {

}


//This function will save the search history
function saveSearch() {

}


//This function will process the search when a history button is clicked
function searchHistory() {

}


//This function will fetch data from the api
function fetchCityWeather() {
    //get latitude and longitude
    var appid = '1df8c06cbcb9f58d162e4920b1bd8368';
    var q = 'eugene';

    fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=6&appid={API key}')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
    
    var lat = 44.052071;
    var lon = -123.086754;

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}


//This function will run the initial display of the page
window.onload = function() {
    fetchCityWeather();
}