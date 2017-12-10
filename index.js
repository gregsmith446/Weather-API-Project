/*global $ navigator position APIKEY*/

//get lat and lon - location using js
$(document).ready(function() {
    var lat;
    var long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            //$("#location").html("latitude: " + lat + "<br>longitude: " + long);
            // console.log(lat, long);

            $.ajax({
                method: "GET",
                url: "https://api.openweathermap.org/data/2.5/weather",
                data: { lat: lat, lon: long, units: "imperial", appid: APIKEY },
                success: function weatherData(data) {
                    // console.log(data);
                    $("#city").text(data.name);
                    $("#current").text(data.weather[0].main);
                    //$("#temp").text(data.main.temp) + " deg F";
                    document.getElementById("temp").innerHTML = (data.main.temp) + " deg F";
                    //$("#wind").text(data.wind.speed) + " MPH";
                    document.getElementById("wind").innerHTML = (data.wind.speed) + " MPH";
                    //$("#summary").text(data.weather[0].description);
                    // $("#icon").src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                    document.getElementById("icon").src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

                    $("#cel").click(function() { //onClick function in jQuery used to convert temp to C
                        // console.log("your code is running the C onclick function");
                        var fahr = data.main.temp;
                        var cels = (fahr - 32) * 0.5556;
                        var celsiusRounded = Number((cels).toFixed(2)); // reduces decimal to 2 places
                        //$("#temp").text = celsiusRounded + " deg C"; //didn't work?
                        document.getElementById("temp").innerHTML = celsiusRounded + " deg C"; //sends result to div
                        // console.log(cels)
                        // console.log(celsiusRounded)
                        // console.log("on click temp Cels finished");
                        $("#fahr").click(function() { //onClick function uses jQuery to put temp back to Fahr
                            var fahr = data.main.temp;
                            document.getElementById("temp").innerHTML = fahr + " deg F";
                        });
                    });
                }

            });
        });
    }
});

//5.) add image to background that shows the weather to get bonus points using this format: 
// .class or #ID {
//     background: URL("https://i.imgur.com/Xo7TsYQ.jpg") no-repeat center center;
//     background-size: cover;
//     height: 100vh;
//     width: 100vw;
// }
