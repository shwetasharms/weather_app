import styled from "styled-components";
import React, { useState } from "react";
import { WeatherIcons } from "../App";

export const WeatherInfoIcons = {
  temperature: "./icons/temp.svg",
  sunset: "./icons/temp.svg",
  sunrise: "./icons/temp.svg",
  humidity: "./icons/humidity.svg",
  wind: "./icons/wind.svg",
  pressure: "./icons/pressure.svg",
};
const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;
const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
  & button {
    background-color: black;
    font-size: 14px;
    padding: 0 10px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: bold;
    margin-left:5px
  }
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px;
  border: black solid 1px;
  border-radius: 2px;

  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: Montserrat;
    font-weight: bold;
  }
  & button {
    background-color: black;
    font-size: 14px;
    padding: 0 10px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: bold;
  }
`;
const ForecastBtn = styled.form`
& button {
  background-color: black;
  font-size: 14px;
  padding: 0 10px;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: Montserrat;
  font-weight: bold;
  margin-top:15px;
}
`;
const ChooseCityLabel = styled.span`
  color: black;
  margin: 10px auto;
  font-size: 18px;
  font-weight: bold;
`;
const WelcomeWeatherLogo = styled.img`
  width: 140px;
  height: 140px;
  margin: 40px auto;
`;
const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
`;
const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const WeatherInfoComponent = (props) => {
  const { name, value } = props;

  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]} />
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};
const CityComponent = (props) => {
  const { updateCity, fetchWeather, fetchForecast } = props;
  const { weather, city, forecast } = props;
  const [isCelsius, setIsCelsius] = useState(true);
  const isDay = weather?.weather[0].icon?.includes('d')
  const isDayTime = (data) => {
    if (!data) return false; // Handle case where data is not available
    const currentTime = new Date().getTime() / 1000; // Convert milliseconds to seconds
    return currentTime < data?.sys.sunset && currentTime > data?.sys.sunrise;
  };
  // const isDay = weather?.weather[0].icon?.includes('d')
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
  }
  const toggleTemperature = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  // Function to convert temperature to Celsius or Fahrenheit
  const convertTemperature = (kelvinTemp) => {
    return isCelsius ? `${Math.floor(kelvinTemp - 273)}°C` : `${Math.floor((kelvinTemp - 273) * 9 / 5 + 32)}°F`;
  };
  const getDate=(data)=>{
    const timestamp = data.dt_txt
    ; // Unix timestamp
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: '2-digit' }; // Convert timestamp to milliseconds
    const dateString = date.toLocaleDateString('en-GB', options);
    return dateString
  }
  return (
    <>
      <ChooseCityLabel>Find Weather of your city</ChooseCityLabel>
      <SearchBox onSubmit={fetchWeather}>
        <input
          onChange={(e) => updateCity(e.target.value)}
          placeholder="City"
        />
        <button type={"submit"}>Search</button>
      </SearchBox>
      {city && weather ? (
        <>
          <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
          <WeatherContainer>
            <Condition>
              {/* <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span> */}
              <span>{convertTemperature(weather?.main?.temp)}</span>
              {`  |  ${weather?.weather[0].description}`}
              <button onClick={toggleTemperature}>
                {`${isCelsius ? '°F' : '°C'}`}
              </button>
            </Condition>
            <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]} />
          </WeatherContainer>

          {/* Weather Information */}


          <WeatherInfoLabel>Weather </WeatherInfoLabel>
          <WeatherInfoContainer>
            <WeatherInfoComponent name={isDay ? "sunset" : "sunrise"}
              value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`} />
            <WeatherInfoComponent name={"humidity"} value={weather?.main?.humidity} />
            <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed} />
            <WeatherInfoComponent name={"pressure"} value={weather?.main?.pressure} />
          </WeatherInfoContainer>

          {/* Forecast Information */}
          <ForecastBtn onSubmit={fetchForecast}>
            <button type={"submit"}>Forecast  </button>
          </ForecastBtn>
          {forecast && <>
            {forecast?.map((data) => (
              <WeatherInfoContainer>
                 <WeatherInfoLabel>{getDate(data)} </WeatherInfoLabel>
                <WeatherInfoComponent name={"temperature"} value={convertTemperature(data?.main?.temp)} />
                <WeatherInfoComponent name={"humidity"} value={data?.main?.humidity} />
                <WeatherInfoComponent name={"wind"} value={data?.wind?.speed} />
                <WeatherInfoComponent name={"pressure"} value={data?.main?.pressure} />

              </WeatherInfoContainer>
            )
            )}
          </>}
        </>
      ) : (
        <WelcomeWeatherLogo src={"./icons/perfect-day.svg"} />
      )}
    </>
  );
};
export default CityComponent;
