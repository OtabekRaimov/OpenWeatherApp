const searchBox = document.getElementById('input');
const searchButton = document.getElementById('buton');
const weicon = document.getElementById('icon');


async function check(city) {
    if (localStorage.myCity.toLowerCase() == searchBox.value.toLowerCase() && localStorage.when != null && parseInt(localStorage.when) + 60000 > Date.now()) {
        document.getElementById("temp").innerHTML = localStorage.myTemperature;
        document.getElementById("city").innerHTML = localStorage.myCity;
        document.getElementById("humidity").innerHTML = localStorage.myHumidity;
        document.getElementById("speed").innerHTML = localStorage.myWind;
        document.getElementById('meta').innerHTML = localStorage.myDescription;
        weicon.src = localStorage.myIcon;
    }
    else {
        await fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + city + '&appid=c51e3ce6274304f58ee7544c87075370')
            .then(response => response.json())
            .then(response => {

                document.getElementById("temp").innerHTML = Math.round(response.main.temp) + `°C`;
                document.getElementById("city").innerHTML = response.name;
                document.getElementById("humidity").innerHTML = Math.round(response.main.humidity) + `%`;
                document.getElementById("speed").innerHTML = Math.round(response.wind.speed) + `km/h`;
                document.getElementById('meta').innerHTML = response.weather[0].description;
                weicon.src = `./images/${response.weather[0].icon}.png`;

                localStorage.myDescription = response.weather[0].description;
                localStorage.myTemperature = Math.round(response.main.temp) + `°C`;
                localStorage.when = Date.now();
                localStorage.myCity = response.name;
                localStorage.myHumidity = Math.round(response.main.humidity) + `%`;
                localStorage.myWind = Math.round(response.wind.speed) + `km/h`;
                localStorage.myIcon = `./images/${response.weather[0].icon}.png`;
    })

}}


searchButton.addEventListener('click', ()=>{
    console.log(searchBox.value)
    check(searchBox.value)
})