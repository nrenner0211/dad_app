let weather = {
    myKey: "dcbc862bcf16c64fe76c5467e987cbd0",
    fetchWeather: function () {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city + "&units=imperial&appid=" + myKey
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
    },

};