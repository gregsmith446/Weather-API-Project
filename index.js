/*global $ navigator position APIKEY*/

var lat, long;
var place = navigator.geolocation;
//establish the vars lat and long
//assign navigator.geolocation to place to simplify code

// uses HTML geolocation
$(document).ready(function() {
    if (place) {
        place.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            weather.geoLocation(lat, long);
        });
    }
    else {
        alert('please allow location')
    }
});

//weather handler + ajax call within a function
var weather = {
    geoLocation: function() {
        //method, the URL, and the data to grab
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather",
            data: {lat: lat, lon: long, units: "imperial", appid: APIKEY},
        //once successful in retreiving the data for given lat + long, this is where to put the data
        success: function weatherData(data) {
            $("#city").text(`${data.name}`); //city name
            $("#current").text(`${data.weather[0].main.toUpperCase()}`); //current coditions
            $("#icon").html(`<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></img>`); //weather icon
            $("#wind").text(`${data.wind.speed.toFixed(0)} MPH`); //wind speed in MPH no decimals
            $("#temp").text(`${data.main.temp.toFixed(0)} °F`); //temp in deg F no decimals
        }
    }
    )}
}