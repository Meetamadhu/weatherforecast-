document.addEventListener('DOMContentLoaded', () => {
    const cityDropdown = document.getElementById('city-dropdown');
    const searchButton = document.querySelector('button');
    const contentDiv = document.querySelector('.content'); // Content section for weather info
    const forecastGrid = document.querySelector('.forecast-grid'); // Forecast section
    const infoSection = document.querySelector('.info-section');


        const heading = document.querySelector('content');
        if (heading) {
            heading.style.color = 'orange'; // Changes text color to purple
        }
    


    const apiKey = 'YOUR_API_KEY'; // OpenWeather API Key
    const timeZoneApiKey = 'YOUR_API_KEY'; // TimeZoneDB API Key

    const europeCitiesUrl = 'europe_cities.json'; // URL for city data
    particlesJS('particles-js-1', {
        particles: {
          number: { value: 150, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.8, random: true },
          size: { value: 4, random: true },
          move: { enable: true, speed: 1, direction: 'bottom', out_mode: 'out' },
        },
        interactivity: { detect_on: 'canvas' },
        retina_detect: true,
      });
      
      // Second Particle Effect (e.g., Floating Bubbles)
      particlesJS('particles-js-2', {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
          color: { value: '#00ffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.6, random: true },
          size: { value: 6, random: true },
          move: { enable: true, speed: 2, direction: 'top', out_mode: 'out' },
        },
        interactivity: { detect_on: 'canvas' },
        retina_detect: true,
      });
    
  
    // Populate the dropdown with cities
    async function loadCities() {
        try {
            const response = await fetch(europeCitiesUrl);
            if (!response.ok) throw new Error('Failed to fetch city data');
            const cities = await response.json();
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = `${city.lat},${city.lon}`;
                option.textContent = city.name;
                cityDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading cities:', error);
            alert('Failed to load city data. Please try again later.');
        }
    }

    let map; // Declare the map variable globally

    // Initialize Google Map
    function initializeMap(lat, lon) {
        const location = { lat: parseFloat(lat), lng: parseFloat(lon) };
    
        // Check if map is already initialized
        if (!map) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: location,
                zoom: 10,
            });
        } else {
            // Update map center and marker if already initialized
            map.setCenter(location);
        }
    
        // Add a marker to the map
        new google.maps.Marker({
            position: location,
            map: map,
        });
    }

    // Fetch and display weather data
    async function fetchWeather(lat, lon) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) throw new Error('Failed to fetch weather data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    // Fetch and display 5-day forecast data
    async function fetchForecast(lat, lon) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) throw new Error('Failed to fetch forecast data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            throw error;
        }
    }

    // Fetch and display the local time
    async function fetchLocalTime(lat, lon) {
        const timeZoneUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
        try {
            const response = await fetch(timeZoneUrl);
            if (!response.ok) throw new Error('Failed to fetch time data');
            const data = await response.json();
            return data.formatted; // Returns local time
        } catch (error) {
            console.error('Error fetching local time:', error);
            throw error;
        }
    }

    // Map OpenWeather icon codes to Weather Icons classes
    const iconMap = {
        '01d': 'wi-day-sunny',
        '01n': 'wi-night-clear',
        '02d': 'wi-day-cloudy',
        '02n': 'wi-night-alt-cloudy',
        '03d': 'wi-cloud',
        '03n': 'wi-cloud',
        '04d': 'wi-cloudy',
        '04n': 'wi-cloudy',
        '09d': 'wi-showers',
        '09n': 'wi-showers',
        '10d': 'wi-day-rain',
        '10n': 'wi-night-alt-rain',
        '11d': 'wi-thunderstorm',
        '11n': 'wi-thunderstorm',
        '13d': 'wi-snow',
        '13n': 'wi-snow',
        '50d': 'wi-fog',
        '50n': 'wi-fog',
    };

    function getWeatherIcon(iconCode) {
        return `http://openweathermap.org/img/wn/${iconCode}.png`; // Return the URL for the weather icon
    }

    // Display weather data
    function displayWeather(data, localTime) {
        const city = data.name || 'Unknown City';
        const country = data.sys?.country || 'Unknown Country';
        const temp = data.main?.temp || 'N/A';
        const weatherDesc = data.weather?.[0]?.description || 'N/A';
        const humidity = data.main?.humidity || 'N/A';
        const windSpeed = data.wind?.speed || 'N/A';
        const minTemp = data.main?.temp_min || 'N/A'; // Correct property for min temperature
        const maxTemp = data.main?.temp_max || 'N/A'; // Correct property for max temperature
        const visibility = data.visibility || 'N/A'; // Corrected visibility property
        const precipitation = data.precipitation?.value || 'N/A'; // Precipitation might not be available
        const sunriseTimestamp = data.sys?.sunrise;document.addEventListener('DOMContentLoaded', () => {
        


    // Populate the dropdown with cities
    async function loadCities() {
        try {
            const response = await fetch(europeCitiesUrl);
            if (!response.ok) throw new Error('Failed to fetch city data');
            const cities = await response.json();
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = `${city.lat},${city.lon}`;
                option.textContent = city.name;
                cityDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading cities:', error);
            alert('Failed to load city data. Please try again later.');
        }
    }



    // Fetch and display 5-day forecast data
    async function fetchForecast(lat, lon) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) throw new Error('Failed to fetch forecast data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            throw error;
        }
    }

    // Fetch and display the local time
    async function fetchLocalTime(lat, lon) {
        const timeZoneUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
        try {
            const response = await fetch(timeZoneUrl);
            if (!response.ok) throw new Error('Failed to fetch time data');
            const data = await response.json();
            return data.formatted; // Returns local time
        } catch (error) {
            console.error('Error fetching local time:', error);
            throw error;
        }
    }

    

    
    // Display 5-day forecast
    function displayForecast(forecastData) {
        const forecastList = forecastData.list.filter((item, index) => index % 8 === 0); // Get one forecast every 8 hours
        forecastGrid.innerHTML = ''; // Clear previous forecasts

        forecastList.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString();
            const temp = forecast.main.temp;
            const weatherDesc = forecast.weather[0].description;
            const iconCode = forecast.weather[0].icon;
            const iconUrl = getWeatherIcon(iconCode);

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-part');
            forecastItem.innerHTML = `
                <h3>${day}</h3>
                <img src="${iconUrl}" alt="${weatherDesc}">
                <p>${weatherDesc}</p>
                <p>${temp}°C</p>
            `;
            forecastGrid.appendChild(forecastItem);
        });
    }

    async function searchWeather() {
        const selectedValue = cityDropdown.value;
        if (!selectedValue) {
            alert('Please select a city from the dropdown.');
            return;
        }
    
        const [lat, lon] = selectedValue.split(',').map(Number);
        content.style.display = 'block';
        infoSection.style.display = 'flex';        
        contentDiv.innerHTML = '<p>Loading weather data...</p>'; // Placeholder while loading
    
        try {
            const weatherData = await fetchWeather(lat, lon);
            const localTime = await fetchLocalTime(lat, lon); // Fetch local time
            displayWeather(weatherData, localTime); // Pass the local time to display function
            const forecastData = await fetchForecast(lat, lon); // Fetch 5-day forecast
            displayForecast(forecastData); // Display 5-day forecast
            initializeMap(lat, lon); // Initialize the map with the city's coordinates
    
            // Show the content and map after successful data fetch
            contentDiv.style.display = 'block';
            document.getElementById('map').style.display = 'block';
        } catch (error) {
            contentDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
    }
    
    // Event listener for the search button
    searchButton.addEventListener('click', searchWeather);

    // Load cities on page load
    loadCities();
});

        const sunsetTimestamp = data.sys?.sunset;

        // If timestamps exist, convert to readable format
        const sunriseTime = sunriseTimestamp ? new Date(sunriseTimestamp * 1000).toLocaleTimeString() : 'N/A';
        const sunsetTime = sunsetTimestamp ? new Date(sunsetTimestamp * 1000).toLocaleTimeString() : 'N/A';

        contentDiv.innerHTML = `
            <h3>Current Weather in ${city}, ${country}</h3>
            <div class="weather-info">
                <div class="weather-part">
                    <h6>Weather:</h6>
                    <p>${weatherDesc}</p>
                </div>
                <div class="weather-part">
                    <h6>Temperature:</h6>
                    <p>${temp}°C</p>
                </div>
                <div class="weather-part">
                    <h6>Min Temp:</h6>
                    <p>${minTemp}°C</p>
                </div>
                <div class="weather-part">
                    <h6>Max Temp:</h6>
                    <p>${maxTemp}°C</p>
                </div>
                <div class="weather-part">
                    <h6>Humidity:</h6>
                    <p>${humidity}%</p>
                </div>
                <div class="weather-part">
                    <h6>Wind Speed:</h6>
                    <p>${windSpeed} m/s</p>
                </div>
                <div class="weather-part">
                    <h6>Local Time:</h6>
                    <p>${localTime}</p>
                </div>
                <div class="weather-part">
                    <h6>Visibility:</h6>
                    <p>${visibility} m</p>
                </div>
                <div class="weather-part">
                    <h6>Precipitation:</h6>
                    <p>${precipitation} mm</p>
                </div>
                <div class="weather-part">
                    <h6>Sunrise:</h6>
                    <p>${sunriseTime}</p>
                </div>
                <div class="weather-part">
                    <h6>Sunset:</h6>
                    <p>${sunsetTime}</p>
                </div>
            </div>
        `;
    }
    

    // Display 5-day forecast
// Display 5-day forecast
function displayForecast(forecastData) {
    const forecastList = forecastData.list.filter((item, index) => index % 8 === 0); // Get one forecast every 8 hours
    forecastGrid.innerHTML = ''; // Clear previous forecasts
    infoSection.style.display = 'flex';        

    forecastList.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString();
        const temp = forecast.main.temp;
        const weatherDesc = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = getWeatherIcon(iconCode);

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-part');
        forecastItem.innerHTML = `
            <h5>${day}</h5>
            <img src="${iconUrl}" alt="${weatherDesc}">
            <p>${weatherDesc}</p>
            <p>${temp}°C</p>
        `;
        forecastGrid.appendChild(forecastItem);
    });

    // Add animation delay to forecast cards
    document.querySelectorAll('.forecast-part').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

    async function searchWeather() {
        const selectedValue = cityDropdown.value;
        if (!selectedValue) {
            alert('Please select a city from the dropdown.');
            return;
        }
    
        const [lat, lon] = selectedValue.split(',').map(Number);
        contentDiv.style.display = 'none'; // Hide the content initially
        document.getElementById('map').style.display = 'none'; // Hide the map initially
        contentDiv.innerHTML = '<p>Loading weather data...</p>'; // Placeholder while loading
    
        try {
            const weatherData = await fetchWeather(lat, lon);
            const localTime = await fetchLocalTime(lat, lon); // Fetch local time
            displayWeather(weatherData, localTime); // Pass the local time to display function
            const forecastData = await fetchForecast(lat, lon); // Fetch 5-day forecast
            displayForecast(forecastData); // Display 5-day forecast
            initializeMap(lat, lon); // Initialize the map with the city's coordinates
    
            // Show the content and map after successful data fetch
            console.log('Displaying content and map...');
            contentDiv.style.display = 'block';
            document.getElementById('map').style.display = 'block';
        } catch (error) {
            console.error('Error fetching data:', error);
            contentDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
    }
    
    // Event listener for the search button
    searchButton.addEventListener('click', searchWeather);

    // Load cities on page load
    loadCities();
});
