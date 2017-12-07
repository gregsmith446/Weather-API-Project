/*global $ navigator position APIKEY*/

//get lat and lon - location using js
$(document).ready(function(){
    var lat
    var long
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        $("#location").html("latitude: " + lat + "<br>longitude: " + long);

        console.log(lat, long);
        
 $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: {lat: lat, lon: long, units: "imperial", appid: APIKEY },
        success: function(data){
            console.log(data);
        }
  });
});
}
});