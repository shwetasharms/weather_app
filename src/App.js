import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";

export const WeatherIcons = {
  "01d": "./icons/sunny.svg",
  "01n": "./icons/night.svg",
  "02d": "./icons/day.svg",
  "02n": "./icons/cloudy-night.svg",
  "03d": "./icons/cloudy.svg",
  "03n": "./icons/cloudy.svg",
  "04d": "./icons/perfect-day.svg",
  "04n": "./icons/cloudy-night.svg",
  "09d": "./icons/rain.svg",
  "09n": "./icons/rain-night.svg",
  "10d": "./icons/rain.svg",
  "10n": "./icons/rain-night.svg",
  "11d": "./icons/storm.svg",
  "11n": "./icons/storm.svg",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;
function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [forecast, updateForecast] = useState();
  const defaultCountryCode = 'IN';  // Default country code if not provided by the user

  const fetchWeather = async (e) => {
    e.preventDefault();
    let apiUrl;
    if (!isNaN(city)) {
      // If input is a number, assume it's a zip code
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${city},${defaultCountryCode}&appid=fe4feefa8543e06d4f3c66d92c61b69c`;
    } else {
      // Otherwise, assume it's a city name
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`;
    }
    const response = await Axios.get(
      apiUrl,
    );
    updateWeather(response.data);
  };
  const fetchForecast = async (e) => {
    e.preventDefault();
    let apiUrl;
    if (!isNaN(city)) {
      // If input is a number, assume it's a zip code
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${city},${defaultCountryCode}&appid=fe4feefa8543e06d4f3c66d92c61b69c`;
    } else {
      // Otherwise, assume it's a city name
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`;
    }
    const response = await Axios.get(
      apiUrl,
    )
    const forecastData = response.data.list.filter((item, index) => index % 8 === 0);
    updateForecast(forecastData);
  };
  return (
    <Container>
      <AppLabel> Weather App</AppLabel>
      <CityComponent updateCity={updateCity} fetchWeather={fetchWeather}fetchForecast={fetchForecast} weather={weather} forecast={forecast} city={city} />
    </Container>
  );
}

export default App;
