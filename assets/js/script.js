let weather = {
    myKey: "dcbc862bcf16c64fe76c5467e987cbd0",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=imperial&appid=" + this.myKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        var { name } = data;
        var { temp, temp_min, temp_max, humidity } = data.main;
        console.log(name, temp, temp_min, temp_max, humidity);
    }
};