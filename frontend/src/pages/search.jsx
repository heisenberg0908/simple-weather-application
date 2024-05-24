import React, { useState, useEffect } from "react";
import { MainHeading } from "../components/mainHeading";
import { SearchBar } from "../components/search";

export const Search = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null); // State to store fetched weather data

  useEffect(() => {
    // useEffect should be at the top level, not inside another function
    console.log('Weather Data Updated:', weatherData);
  }, [weatherData]); // Dependency array should contain weatherData

  const fetchData = async (city) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/weatherinfo?city=${city}`);
      const result = await response.json();
      setWeatherData(result); // Update state with fetched data
      console.log(result);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleClick = () => {
    fetchData(city); // Call fetchData function on button click
  };

  return (
    <div>
      <div className="flex justify-center p-4">
        <MainHeading />
      </div>
      <div>
        <SearchBar
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onClick={handleClick}/>
      </div>
      <RenderData weatherData={weatherData}/> {/* Pass weatherData as prop */}
    </div>
  );
}

function RenderData({ weatherData }) {
  if (!weatherData) {
    return <div className="flex justify-center text-md font-light p-2">Search.. to get the data</div>;
  }
  return (
    <div className="bg-purple-100">
      <div className="flex justify-center">
      <img  className="flex justify:center w-1/6 h-1/6" src={weatherData.weatherdata.current.condition.icon}/>
      </div>
      <div className="flex justify-center font-semibold font-serif text-xl p-4 underline decoration-sky-500">
      <h2>Region Basic Information</h2>
      </div>
      <div className="display-flex justify-center font-light font-serif text-md p-2 underline decoration-pink-500">
      <p>City:         {weatherData.weatherdata.location.name}</p>
      <p>Region:       {weatherData.weatherdata.location.region}</p>
      <p>Country:      {weatherData.weatherdata.location.country}</p>
      <p>Latitude:     {weatherData.weatherdata.location.lat}</p> {/* Correct typo */}
      <p>Longitude:    {weatherData.weatherdata.location.lon}</p>
      <p>Time-Zone-Id: {weatherData.weatherdata.location.tz_id}</p>
      <p>Local Time:   {weatherData.weatherdata.location.localtime}</p>
      </div>
      <div className="flex justify-center font-semibold font-serif text-xl p-4 underline decoration-sky-500">
      <h2>Current Conditions</h2>
      </div> {/* Correct typo */}
      <div  className="display-flex justify-center font-light font-serif text-md p-2 underline decoration-pink-500">
      <p>Temp in C: {weatherData.weatherdata.current.temp_c}</p>
      <p>Temp in F: {weatherData.weatherdata.current.temp_f}</p>
      <p>Condition: {weatherData.weatherdata.current.condition.text}</p>
      
      </div>
      <div className="flex justify-center font-semibold font-serif text-xl p-4 underline decoration-sky-500">
      <h2>Wind & Pressure</h2>
      </div>
      <div  className="display-flex justify-center font-light font-serif text-md p-2 underline decoration-pink-500">
      <p>Wind speed in m/s: {weatherData.weatherdata.current.wind_mph}</p>
      <p>Wind speed in km/hr: {weatherData.weatherdata.current.wind_kph}</p>
      <p>Wind degree: {weatherData.weatherdata.current.wind_degree}</p>
      <p>Pressure in mb: {weatherData.weatherdata.current.pressure_mb}</p>
      <p>Pressure in in: {weatherData.weatherdata.current.pressure_in}</p>
      </div>

      <div className="flex justify-center font-semibold font-serif text-xl p-4 underline decoration-sky-500">
      <h2>Other Info</h2>
      </div>
      <div  className="display-flex justify-center font-light font-serif text-md p-2 underline decoration-pink-500">
      <p>Precipitation(mm): {weatherData.weatherdata.current.precip_mm}</p>
      <p>Precipitation(in): {weatherData.weatherdata.current.precip_in}</p>
      <p>Humidity: {weatherData.weatherdata.current.humidity}</p>
      <p>Feels like(C): {weatherData.weatherdata.current.feelslike_c}</p>
      <p>Feels like(F): {weatherData.weatherdata.current.feelslike_f}</p>
      <p>Vis(km): {weatherData.weatherdata.current.vis_km}</p>
      <p>Vis(miles): {weatherData.weatherdata.current.vis_miles}</p>
      <p>Gust(mph): {weatherData.weatherdata.current.gust_mph}</p>
      <p>Gust(kph): {weatherData.weatherdata.current.gust_kph}</p>
      </div>
    </div>
  );
}
