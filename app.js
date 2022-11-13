window.addEventListener('load', () => {
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.temperature span');
    const windSpeed = document.querySelector('.wind-speed');
    const windDirection = document.querySelector('.wind-direction');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const long = position.coords.longitude;
            const lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=1ab478080a3f4ef98d9258ec3a47b9b1&include=minutely`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data['0']);
                //Set DOM elements from the API
                const temp = data.data['0'].temp;
                const iconSection = document.querySelector('.icon-section');
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = data.data['0'].weather.description;
                locationTimezone.textContent = `${data.data['0'].city_name} / ${data.data['0'].country_code}`;
                iconSection.src = `icons/${data.data['0'].weather.icon}.png`;
                windSpeed.textContent += `${Math.floor(data.data['0'].wind_spd)} m/s`;
                windDirection.textContent += data.data['0'].wind_cdir_full;

                //Formula for Celsius
                let fahrenheit = (temp * 9/5) + 32;
                //Change temperature to C/F
                degreeSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === 'C') {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = Math.floor(fahrenheit);
                    } else {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = temp;
                    };
                });
            });
        });

    } else {
        h1.textContent = 'Please enable location.'
    };

});