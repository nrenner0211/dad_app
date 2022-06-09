//header emoji content -- niki
var iconArray = document.getElementById("iconArray");
var stormY = ["🌩️", "⛈️", "☀️", "🌨️", "🌧️", "☁️", "🌤️", "🌦️"];

iconArray.addEventListener("mouseover", () => {
    iconArray.innerText = stormY[Math.floor(Math.random() * stormY.length)]
});
//end header emoji content -- niki