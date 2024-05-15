//This function will populate the current weather conditions
function displayCurrent() {

}


//This Function will populate the 5-day forecast
function displayForecast() {

}


//This function will render the forecast cards
function renderForecastCards() {

}


//This function will process the search when the search button is clicked
function citySearch(city) {
    saveSearch(city);
    fetchCityWeather(city);
}


//This function will save the search history and render the history buttons
function saveSearch(city) {
    var cityHistory = JSON.parse(localStorage.getItem('cityHx'));
    if (cityHistory === null) {cityHistory = [];}
    if (cityHistory.length > 7) {cityHistory.pop();}
    cityHistory.unshift(city);
    localStorage.setItem('cityHx', JSON.stringify(cityHistory));
}



//This function will render history buttons
function renderHxBtns () {
    var cityHistory = JSON.parse(localStorage.getItem('cityHx'));
    if (cityHistory === null) {cityHistory = [];}
    const searchHistory = document.getElementById('historyBtns');
    searchHistory.textContent = '';
    for (i=0; i<cityHistory.length; i++) {
        const newHxButton = document.createElement('button');
        newHxButton.type = 'button';
        newHxButton.innerText = cityHistory[i];
        newHxButton.className = 'historyBtn';
        newHxButton.value = cityHistory[i];
        searchHistory.append(newHxButton);
    }
}



//This function will fetch data from the API
function fetchCityWeather(cityName) {
    //get latitude and longitude
    const apiKey = '1df8c06cbcb9f58d162e4920b1bd8368';
    const city = cityName;
    var lat;
    var lon;

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
        })
        .then(function() {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=6&appid=${apiKey}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                })
        });
}


//This function will run the initial display of the page
window.onload = function() {
    renderHxBtns();

    document.getElementById('searchCityBtn').addEventListener('click', function(event) {
        event.preventDefault();
        const cityName = document.getElementById('cityName').value;
        citySearch(cityName);
        renderHxBtns();
    });
    
    document.getElementById('historyBtns').addEventListener('click', function(event) {
        if (event.target.className === 'historyBtn') {
            const cityName = event.target.value;
            fetchCityWeather(cityName);
        }
    })
}