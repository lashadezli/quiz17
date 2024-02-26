import React, { useState } from 'react';
import axios from 'axios';
import classes from '../modules/Weather.module.scss';

const WeatherApp = () => {
  const [searchCity, setSearchCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'e4138ac5592b6210a5de9783f2a7c2bd';

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`
      );
      if (response.status === 200) {
        setWeatherData(response.data);
      } else {
        console.log('data ar mushaobs', response.statusText);
      }
    } catch (error) {
      console.error('error data', error.message);
    }
  };

  const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div className={classes['weather']}>
      <div className={classes['box']}>
        <input
          type='text'
          placeholder='Enter city name'
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {weatherData && (
        <div className={classes['Data']}>
          <p> Weather In {weatherData.name}</p>
          <p>{weatherData.main.temp}°C</p>
          <div className={classes['clouds']}>
            <img src={getIconUrl(weatherData.weather[0].icon)} alt='Weather Icon' />
            <p>{weatherData.weather[0].description}</p>
          </div>
          <div className={classes['details']}>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind speed: {weatherData.wind.speed}km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
