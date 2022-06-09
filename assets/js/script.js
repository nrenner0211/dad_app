let isBadWeatherDay = false

let weather = {
    myKey: "dcbc862bcf16c64fe76c5467e987cbd0",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=imperial&appid=" + this.myKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch((error) => console.log(error));
    },

    displayWeather: function (data) {
        var { name } = data;
        if (data.weather) {
            var { icon, description } = data.weather[0];
            var { temp, temp_min, temp_max, humidity } = data.main;

            var badWeatherWords = ["rain", "snow", "tornado", "sleet", "storm", "drizzle"];
            badWeatherWords.some((badWeatherCondition) => {
                isBadWeatherDay = new RegExp('\\b' + badWeatherCondition + '\\b').test(description);
                return isBadWeatherDay;
            })
            console.log(isBadWeatherDay);

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
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector("#search-button").addEventListener("click", function () {
    weather.search();

});

document.querySelector("#mow-button").addEventListener("click", function () {
    let answerText = ""
    if (isBadWeatherDay) {
        answerText = "Don't mow today!"
    } else {
        answerText = "Good to go!"
    }
    document.querySelector("#mow-answer").innerText = answerText;
});

