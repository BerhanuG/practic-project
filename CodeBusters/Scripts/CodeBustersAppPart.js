$(document).ready(function () {

    // Hide the fahrenheit at startup.

    $('.fahrenheit').hide();
    $("#day1F").hide();
    $("#day2F").hide();
    $("#day3F").hide();
    $("#day4F").hide();
    $("#day5F").hide();
    var latitude;
    var longitude;


    // Call geolocation for auto location.

    navigator.geolocation.getCurrentPosition(success => {
        console.log('Works..');
    }, failure => {
        if (failure.message.startsWith("Only secure origins are allowed")) {
            console.log('Secure Origin issue...');
        }
        });


    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (location) {
            latitude = location.coords.latitude;
            longitude = location.coords.longitude;

            console.log(latitude + " " + longitude);


            //Loader is removed when location is found
            setTimeout(function () {
                $('div').removeClass('loader');
            }, 1500);
            var proxy = "https://cors-anywhere.herokuapp.com/";
            var localityShort, localityLong, adminAreaShort, adminAreaLong, countryAbbr;
            var geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + "," + longitude + '&language=en&key=AIzaSyBpHsm6_3pT5MxFenIHHmy6AWjwfmcU4EY';
            $.getJSON(proxy + geocodeURL).done(function (geocode) {
                console.log(geocode.status);
                var i, j, response, location, countryName;
                function locationName() {
                    response = geocode.results[i].address_components;
                    for (j = 0; j < response.length; j++) {
                        if (response[j].types[0] === 'locality') {
                            localityShort = response[j].short_name;
                            localityLong = response[j].long_name;
                        }
                        if (response[j].types[0] === 'administrative_area_level_1') {
                            adminAreaShort = response[j].short_name;
                            adminAreaLong = response[j].long_name;
                        }
                        if (response[j].types[0] === 'country') {
                            countryAbbr = response[j].short_name;
                            countryName = response[j].long_name;
                        }
                    }
                    if (localityLong === adminAreaLong) {
                        adminAreaShort = countryAbbr;
                        adminAreaLong = countryName;
                    }
                }
                for (i = 0; i < geocode.results.length; i++) {
                    if (i === 0) {
                        locationName();
                        if (localityShort === undefined || localityLong === undefined || adminAreaShort === undefined || adminAreaLong === undefined) {
                            response = geocode.results[0].address_components;
                            if (response.length === 1) {
                                if (response[0].types[0] === 'country') {
                                    localityShort = response[0].long_name;
                                    localityLong = response[0].long_name;
                                } else {
                                    localityShort = response[0].short_name;
                                    localityLong = response[0].long_name;
                                }
                                adminAreaShort = ' ';
                                adminAreaLong = ' ';
                            }
                            else {
                                if (localityShort === undefined || localityLong === undefined) {
                                    localityShort = response[0].long_name;
                                    localityLong = response[0].long_name;
                                }
                                if (adminAreaShort === undefined || adminAreaLong === undefined) {
                                    adminAreaShort = countryAbbr;
                                    adminAreaLong = countryName;
                                }
                            }
                        }
                        if (geocode.results[0].types[0] === "locality") {
                            break;
                        }
                    } else if (i > 0) {
                        if (geocode.results[i].types[0] === 'locality') {
                            locationName();
                            break;
                        }
                    }
                }
                if (adminAreaLong === ' ') {
                    location = localityLong;
                } else {
                    location = localityLong + ', ' + adminAreaLong;
                }
                document.getElementById('location').innerHTML = location;

                // call the weather api

                var url = "https://cors-anywhere.herokuapp.com/" + "https://api.darksky.net/forecast/151e33a27450ae43f0e65a3e302f63a6/" + latitude + "," + longitude + "?callback?";

                $.getJSON(proxy + url, function (data) {
                    console.log(data);

                    var temp = data.currently.temperature;
                    var fahrenheit = (data.currently.temperature * 9 / 5 + 32).toFixed(1) + "&deg;F";
                    var celsius = data.currently.temperature.toFixed(1) + "&deg;C";
                    var description = data.currently.summary;
                    var icon = "wi wi-forecast-io-" + data.currently.icon;
                    var wind = " " + data.currently.windSpeed.toFixed(1) + " m/s ";
                    var humidity = " " + (data.currently.humidity * 100).toFixed(0) + " %";


                    //bloody timeout so you can see the loading bars
                    setTimeout(function () {
                        $("#icon").html("<i class=\"" + icon + "\">");
                        $("#description").html(description);
                        $("#humidity").html(humidity).addClass("wi wi-humidity");
                        $("#wind").html(wind).addClass("wi wi-wind");
                        $(".celsius").html(celsius);
                        $(".fahrenheit").html(fahrenheit);

                        //get the weekdays

                        function day() {
                            var day = new Date();
                            var weekdays = new Array(7);
                            weekdays[0] = "Sunday";
                            weekdays[1] = "Monday";
                            weekdays[2] = "Tuesday";
                            weekdays[3] = "Wednesday";
                            weekdays[4] = "Thirsday";
                            weekdays[5] = "Friday";
                            weekdays[6] = "Saturday";
                            weekdays[7] = "Sunday";
                            for (i = 0; i < weekdays.length; i++) {

                                var weekday1 = weekdays[day.getDay()];
                                var weekday2 = weekdays[day.getDay(i) + 1];
                                var weekday3 = weekdays[day.getDay(i) + 2];
                                var weekday4 = weekdays[day.getDay(i) + 3];
                                var weekday5 = weekdays[day.getDay(i) + 4];

                                //forecast max/min temp C / F for 5 days

                                var day1MaxTemp = data.daily.data[0].temperatureMax.toFixed(0);
                                var day1MinTemp = data.daily.data[0].temperatureMin.toFixed(0);
                                var day1Icon = "wi wi-forecast-io-" + data.daily.data[0].icon;
                                $("#day1C").html(weekday1 + "<br>" + day1MinTemp + "&deg;/" + day1MaxTemp + "&deg; <br> <i class=\"" + day1Icon + "\" id=\"smallIcon\">");
                                var day1MaxTemp = (data.daily.data[0].temperatureMax * 9 / 5 + 32).toFixed(0);
                                var day1MinTemp = (data.daily.data[0].temperatureMin * 9 / 5 + 32).toFixed(0);
                                var day1Icon = "wi wi-forecast-io-" + data.daily.data[0].icon;
                                $("#day1F").html(weekday1 + "<br>" + day1MinTemp + "&deg;/" + day1MaxTemp + "&deg; <br> <i class=\"" + day1Icon + "\" id=\"smallIcon\">");


                                var day2MaxTemp = data.daily.data[1].temperatureMax.toFixed(0);
                                var day2MinTemp = data.daily.data[1].temperatureMin.toFixed(0);
                                var day2Icon = "wi wi-forecast-io-" + data.daily.data[1].icon;
                                $("#day2C").html(weekday2 + "<br>" + day2MinTemp + "&deg;/" + day2MaxTemp + "&deg; <br> <i class=\"" + day2Icon + "\" id=\"smallIcon\">");
                                var day2MaxTemp = (data.daily.data[1].temperatureMax * 9 / 5 + 32).toFixed(0);
                                var day2MinTemp = (data.daily.data[1].temperatureMin * 9 / 5 + 32).toFixed(0);
                                var day2Icon = "wi wi-forecast-io-" + data.daily.data[1].icon;
                                $("#day2F").html(weekday2 + "<br>" + day2MinTemp + "&deg;/" + day2MaxTemp + "&deg; <br> <i class=\"" + day2Icon + "\" id=\"smallIcon\">");

                                var day3MaxTemp = data.daily.data[2].temperatureMax.toFixed(0);
                                var day3MinTemp = data.daily.data[2].temperatureMin.toFixed(0);
                                var day3Icon = "wi wi-forecast-io-" + data.daily.data[2].icon;
                                $("#day3C").html(weekday3 + "<br>" + day3MinTemp + "&deg;/" + day3MaxTemp + "&deg; <br> <i class=\"" + day3Icon + "\" id=\"smallIcon\">");
                                var day3MaxTemp = (data.daily.data[2].temperatureMax * 9 / 5 + 32).toFixed(0);
                                var day3MinTemp = (data.daily.data[2].temperatureMin * 9 / 5 + 32).toFixed(0);
                                var day3Icon = "wi wi-forecast-io-" + data.daily.data[2].icon;
                                $("#day3F").html(weekday3 + "<br>" + day3MinTemp + "&deg;/" + day3MaxTemp + "&deg; <br> <i class=\"" + day3Icon + "\" id=\"smallIcon\">");


                                var day4MaxTemp = data.daily.data[3].temperatureMax.toFixed(0);
                                var day4MinTemp = data.daily.data[3].temperatureMin.toFixed(0);
                                var day4Icon = "wi wi-forecast-io-" + data.daily.data[3].icon;
                                $("#day4C").html(weekday4 + "<br>" + day4MinTemp + "&deg;/" + day4MaxTemp + "&deg; <br> <i class=\"" + day4Icon + "\" id=\"smallIcon\">");
                                var day4MaxTemp = (data.daily.data[3].temperatureMax * 9 / 5 + 32).toFixed(0);
                                var day4MinTemp = (data.daily.data[3].temperatureMin * 9 / 5 + 32).toFixed(0);
                                var day4Icon = "wi wi-forecast-io-" + data.daily.data[3].icon;
                                $("#day4F").html(weekday4 + "<br>" + day4MinTemp + "&deg;/" + day4MaxTemp + "&deg; <br> <i class=\"" + day4Icon + "\" id=\"smallIcon\">");

                                var day5MaxTemp = data.daily.data[4].temperatureMax.toFixed(0);
                                var day5MinTemp = data.daily.data[4].temperatureMin.toFixed(0);
                                var day5Icon = "wi wi-forecast-io-" + data.daily.data[4].icon;
                                $("#day5C").html(weekday5 + "<br>" + day5MinTemp + "&deg;/" + day5MaxTemp + "&deg; <br> <i class=\"" + day5Icon + "\" id=\"smallIcon\">");
                                var day5MaxTemp = (data.daily.data[4].temperatureMax * 9 / 5 + 32).toFixed(0);
                                var day5MinTemp = (data.daily.data[4].temperatureMin * 9 / 5 + 32).toFixed(0);
                                var day5Icon = "wi wi-forecast-io-" + data.daily.data[4].icon;
                                $("#day5F").html(weekday5 + "<br>" + day5MinTemp + "&deg;/" + day5MaxTemp + "&deg; <br> <i class=\"" + day5Icon + "\" id=\"smallIcon\">");


                            }

                        }

                        day();


                    }, 2200);   // end of timeout 


                    //jQuery hide / show for celsius and farenheit, hides the farenheit auto in start of this code.
                    $(".fahrenheit-btn").on("click", function () {
                        $(".celsius").hide();
                        $("#day1C").hide();
                        $("#day2C").hide();
                        $("#day3C").hide();
                        $("#day4C").hide();
                        $("#day5C").hide();
                        $(".fahrenheit").show(fahrenheit);
                        $("#day1F").show();
                        $("#day2F").show();
                        $("#day3F").show();
                        $("#day4F").show();
                        $("#day5F").show();
                    });
                    $(".celsius-btn").on("click", function () {
                        $(".fahrenheit").hide();
                        $("#day1F").hide();
                        $("#day2F").hide();
                        $("#day3F").hide();
                        $("#day4F").hide();
                        $("#day5F").hide();
                        $(".celsius").show(celsius);
                        $("#day1C").show();
                        $("#day2C").show();
                        $("#day3C").show();
                        $("#day4C").show();
                        $("#day5C").show();
                    });
                });
            });
        });

        //Gets the current time, day, month and year //
        var months = new Array(12);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0!
        var yyyy = today.getFullYear();
        var tttt = today.getHours();
        var min = today.getMinutes();

        if (dd < 10) {
            dd = '0' + dd
        }
        today = tttt + ':' + min + ' / ' + dd + '. ' + months[mm] + ', ' + yyyy;
        $(".date").html(today);
    }
});