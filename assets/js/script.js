// weather cookie - cameron cottman
window.onload = function () {
    document.cookie.split(';').some((item) => {
        if (item.trim().startsWith("weather=")) {
            var lastSearch = item.trim().split('=')[1];
            weather.fetchWeather(lastSearch);
        }
    });
};

//weather logic begins -Christian
let isBadWeatherDay = false

let weather = {
    myKey: "dcbc862bcf16c64fe76c5467e987cbd0",
    //fetch weather from openweather API -Christian
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=imperial&appid=" + this.myKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch((error) => console.log(error));
    },

    displayWeather: function (data) {
        document.querySelector("#mow-answer").innerText = "";
        var { name } = data;
        // if statement to handle situation where there is no weather data (mispelled city, non existent location, etc.) -Christian
        if (data.weather) {
            var { icon, description } = data.weather[0];
            var { temp, temp_min, temp_max, humidity } = data.main;

            // Bad weather conditions array -Christian
            var badWeatherWords = ["rain", "snow", "tornado", "sleet", "storm", "drizzle", "thunderstorm"];
            // found out about and used "some" loop, which ends a for loop if "true" is returned -Christian
            badWeatherWords.some((badWeatherCondition) => {
                // uses regular expression to seek out bad weather terms in description
                isBadWeatherDay = new RegExp('\\b' + badWeatherCondition + '\\b').test(description);
                return isBadWeatherDay;
            })

            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".temp").innerText = temp + "°F";
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".highLow").innerText = "High: " + temp_max + "°F Low: " + temp_min + "°F";
            document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        } else {
            document.querySelector(".city").innerText = "No results found, please try again.";
        }
    },
    //City search bar function -Christian
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

//City search event listener -Christian
document.querySelector("#search-button").addEventListener("click", function () {
    //  storing cookie -cameron
    document.cookie = "weather=" + document.querySelector(".search-bar").value;
    // - Christian
    console.log("search button works");
    weather.search();
    document.querySelector("#mow-button").classList.remove("hide");
    document.querySelector(".search-alert").classList.add("hide");
});

//Good to mow button event listener -Christian
document.querySelector("#mow-button").addEventListener("click", function () {
    let answerText = ""
    if (isBadWeatherDay) {
        answerText = "Don't mow today!"
    } else {
        answerText = "Good to go!"
    }
    document.querySelector("#mow-answer").innerText = answerText;
});

//start of dad joke generator

var jokeContainer = document.querySelector("#dad-joke");
var jokeButton = document.querySelector("#generate-joke");
var url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit";

//joke generated when clicking generate button
jokeButton.addEventListener("click", (e) => {
    generateJokes();
});

async function generateJokes() {
    //pause javascript until fetch is made
    var res = await fetch(url);
    //pause javascript until json array is returned
    var data = await res.json();
    jokeContainer.innerText = "";
    let joke = "";
    //check API for jokes in multiple data locations
    if (data.joke == undefined) {
        joke = `${data.setup} ${data.delivery}`;
    } else {
        joke = data.joke;
    }
    //add joke to container
    jokeContainer.innerText = joke;
}

//header emoji content -- niki
var iconArray = document.getElementById("iconArray");
var stormY = ["🌩️", "⛈️", "☀️", "🌨️", "🌧️", "☁️", "🌤️", "🌦️"];

iconArray.addEventListener("mouseover", () => {
    iconArray.innerText = stormY[Math.floor(Math.random() * stormY.length)]
});
//end header emoji content -- niki

// Sports API start -- Ben
const options = {
    method: 'GET',
    url: 'https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores',
    params: { daysFrom: '365' },
    headers: {
        'X-RapidAPI-Key': '94f7aacf8amsha7bbb052c8fd086p1916d8jsn6a414cca332f',
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
    }
};

var getSportsStats = function () {

    fetch('https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores', options)
        .then((response) => response.json())
        .then((data) => displayScores(data))
        .catch((error) => console.log(error));
}

//fetch('https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores', options)
//.then(response => response.json())
//.then(data => {
// console.log(data)
//var getHomeScore = data[0].scores[0]
//var getAwayScore = data[0].scores[1]
//displayScores(getHomeScore, getAwayScore);
//});


var displayScores = function (data) {
    var getHomeScore = data[0].scores[0]
    var getAwayScore = data[0].scores[1]

    document.querySelector(".home-score").innerText = getHomeScore.name + "- " + getHomeScore.score;
    document.querySelector(".away-score").innerText = getAwayScore.name + "- " + getAwayScore.score;
    console.log(getHomeScore, getAwayScore);
};

getSportsStats();






