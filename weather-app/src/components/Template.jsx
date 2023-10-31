import React, { useState, useEffect } from 'react';

const API_KEY = '148cfde4e9d0fa20c8faf74005966c1a';

const Template = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            const data = await response.json();
            setWeather(data);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (city) {
            fetchWeatherData();
        }
    }, [city]);

    return (
        <div className="w-9/12 mx-auto p-4 bg-white rounded-lg shadow-md mt-10 md:mt-20 lg:mt-40">
            <div className="city-search">
                <input
                    type="search"
                    placeholder="Enter city"
                    value={city}
                    onChange={(event) => {
                        setCity(event.target.value);
                    }}
                    className="w-full py-2 px-3 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            {loading && <p className="mt-4 text-center">Loading...</p>}
            {weather.main && (
                <div className="content-show mt-4 flex flex-col">
                    <div className='main flex flex-col md:flex-col justify-evenly'>
                        <div className='city flex md:flex-col flex-row justify-center text-3xl md:text-2xl font-bold'>
                            {weather.name}
                        </div>
                        <div className='about'>
                            <div className="temp-degree text-7xl md:text-8xl text-center font-bold">
                                {(weather.main.temp - 273.15).toFixed(1)}°C
                            </div>
                            <div className="weather-visible mt-2 text-2xl md:text-3xl text-center font-bold">
                                {weather.weather[0].description}
                            </div>
                        </div>
                    </div>
                    <div className="more mt-5 flex flex-col md:flex-row gap-5 justify-center text-base md:text-lg">
                        <div className="humidity">
                            Humidity: {weather.main.humidity}%
                        </div>
                        <div className="wind">
                            Wind: {weather.wind.speed} m/s
                        </div>
                        <div className="visibility">
                            Visibility: {weather.visibility} meters
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Template;
