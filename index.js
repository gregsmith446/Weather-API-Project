/*global $ navigator position APIKEY*/

var lat, lon;
var place = navigator.geolocation;
//establish the vars lat and long
//assign navigator.geolocation to place to simplify code

// uses HTML geolocation
$(document).ready(function() {
    if (place) {
        place.getCurrentPosition((position) => {
            lat = `lat=${position.coords.latitude}`;
            lon = `lon=${position.coords.longitude}`;

	        console.log('lat:', lat);
	        console.log('lon:', lon);

	        // pass in lat and long to be used in geoLocation
	        geoLocation(lat, lon)
        });

    }
    else {
        alert('please allow location')
    }
});

//weather handler + ajax call within a function
    function geoLocation(lat, lon) {
        //method, the URL, and the data to grab
        $.ajax({
            method: "GET",
            url: `https://fcc-weather-api.glitch.me/api/current?${lat}&${lon}`,
                success: function (data) {
            $('#loader-section').hide();
            $('#weatherData').show();

	        console.log('data:', data),

            $("#city").text(`${data.name}`); //city name
            $("#current").text(`${data.weather[0].main.toUpperCase()}`); //current conditions
            $("#icon").html(`<img src=${data.weather[0].icon}>`); //weather icon
            $("#wind").text(`${data.wind.speed.toFixed(0)} MPH`); //wind speed in MPH no decimals
            $("#temp").text(`${data.main.temp.toFixed(0)} °F`); //temp in deg F no decimals
        }
    }
    )}