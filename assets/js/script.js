//Define global variables
var weatherData;

//This function will populate the current weather conditions
function displayCurrent(data) {
    const currentEl = document.getElementById('currentWeather');
    currentEl.textContent = "";

    let city = data.city.name;
    let date = (dayjs(data.list[0].dt_txt).add(data.city.timezone, 'second')).format('M/DD/YYYY');  //date converted from UTC to searched city's local date
    let icon = ' https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
    let temp = ((data.list[0].main.temp-273.15) * (9/5) + 32).toFixed(2); //Temperature converted from Kelvin to Fahrenheit
    let wind = (data.list[0].wind.speed * 2.237).toFixed(2);  //Wind speed converted from meters/second to MPH
    let humidity = data.list[0].main.humidity;

    const currentIcon = document.createElement('img');
    const currentHdr = document.createElement('h1');
    const currentTemp = document.createElement('p');
    const currentWind = document.createElement('p');
    const currentHum = document.createElement('p');

    currentIcon.src = icon;
    currentHdr.textContent = `${city} (${date})  `;
    currentTemp.textContent = `Temp: ${temp}°F`;
    currentWind.textContent = `Wind: ${wind} MPH`;
    currentHum.textContent = `Humidity: ${humidity}%`

    currentWind.append(currentHum);
    currentTemp.append(currentWind);
    currentHdr.append(currentIcon);
    currentEl.append(currentHdr);
    currentEl.append(currentTemp);

}


//This Function will populate the 5-day forecast
function displayForecast(data) {
    const currentEl = document.getElementById('forecast');
    currentEl.textContent = "";

    for (i=0; i<5; i++) {
        let date = (dayjs(data.list[i*8].dt_txt).add(data.city.timezone, 'second')).format('M/DD/YYYY');  //date converted from UTC to searched city's local date
        let icon = ' https://openweathermap.org/img/wn/' + data.list[i*8].weather[0].icon + '@2x.png';
        let temp = ((data.list[i*8].main.temp-273.15) * (9/5) + 32).toFixed(2); //Temperature converted from Kelvin to Fahrenheit
        let wind = (data.list[i*8].wind.speed * 2.237).toFixed(2);  //Wind speed converted from meters/second to MPH
        let humidity = data.list[i*8].main.humidity;

        const forecastCard = document.createElement('div')
        const currentIcon = document.createElement('img');
        const currentHdr = document.createElement('h2');
        const currentTemp = document.createElement('p');
        const currentWind = document.createElement('p');
        const currentHum = document.createElement('p');

        currentIcon.src = icon;
        currentHdr.textContent = `${date}`;
        currentTemp.textContent = `Temp: ${temp}°F`;
        currentWind.textContent = `Wind: ${wind} MPH`;
        currentHum.textContent = `Humidity: ${humidity}%`

        currentWind.append(currentHum);
        currentTemp.append(currentWind);
        forecastCard.append(currentHdr);
        forecastCard.append(currentIcon);
        forecastCard.append(currentTemp);
        currentEl.append(forecastCard);
    }
}



//This function will render the page when the search button is clicked
function renderPage() {
    renderHxBtns();
    displayCurrent(weatherData);
    displayForecast(weatherData);
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
    //define variables
    const apiKey = '1df8c06cbcb9f58d162e4920b1bd8368';
    const city = cityName;
    var lat;
    var lon;
    //get latitude and longitude
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
        })
        //get weather data based on coordinates
        .then(function() {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=6&appid=${apiKey}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    weatherData=data;
                    console.log(weatherData);
                })
        })
}



//This function will run the initial display of the page
window.onload = function() {
    renderHxBtns();

    document.getElementById('searchCityBtn').addEventListener('click', function(event) {
        event.preventDefault();
        const cityName = document.getElementById('cityName').value;
        if (cityName !== "") {
            saveSearch(cityName);
            fetchCityWeather(cityName);
            setTimeout(() => {
                renderPage();
            }, 500);
        }
        
    });
    
    document.getElementById('historyBtns').addEventListener('click', function(event) {
        if (event.target.className === 'historyBtn') {
            const cityName = event.target.value;
            fetchCityWeather(cityName);
            setTimeout(() => {
                renderPage();
            }, 500);
        }
    })
}