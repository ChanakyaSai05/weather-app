import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import API_KEY from "./keys";
function App() {
  const [datalist, setDataList] = useState();
  const [latitude, setLatitude] = useState(42.98);
  const [longitude, setLongitude] = useState(-81.23);
  const [units, setUnits] = useState("metric");
  const [language, setLanguage] = useState("en");

  const weatherApi = async () => {
    const { data } = await axios.get(
      // `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${language}`
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${language}`
    );
    // console.log(data.daily);
    console.log(data);
    setDataList([...data.daily]);
    console.log(datalist);
  };
  useEffect(() => {
    weatherApi();
    //es-lint disable react-hooks/exhaustive-deps
  }, []);

  const submitFunction = () => {
    weatherApi();
  };

  const getLocation = () => {
    let opts = {
      enableHighAccuracy: true,
      timeout: 10000, //10 seconds
      maximumAge: 1000 * 60 * 5, //5minutes
    };
    navigator.geolocation.getCurrentPosition(showPosition, showError, opts);
  };
  function showPosition(position) {
    console.log(position);
    setLatitude(position.coords.latitude.toFixed(2));
    setLongitude(position.coords.longitude.toFixed(2));
  }
  function showError(error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occured.");
        break;
    }
  }
  return (
    <div className="app">
      <input
        type="number"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="number"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button onClick={submitFunction}>Submit</button>
      <button onClick={getLocation}>Location</button>
      <div>
        {datalist?.map((item, index) => {
          const fulldate = new Date(item.dt * 1000).toDateString();
          const sunrise = new Date(item.sunrise * 1000).toTimeString();
          const sunset = new Date(item.sunset * 1000).toTimeString();
          const getHours = new Date(item.dt * 1000).getHours();
          console.log(getHours);
          let temperature;
          console.log(temperature);
          if (6 < getHours < 9) {
            temperature = item.temp.morn;
          } else if (9 < getHours < 17) {
            temperature = item.temp.day;
          } else if (17 < getHours < 20) {
            temperature = item.temp.eve;
          } else if (20 < getHours < 6) {
            temperature = item.temp.night;
          }
          let feels_like;
          if (6 < getHours < 9) {
            feels_like = item.feels_like.morn;
          } else if (9 < getHours < 17) {
            feels_like = item.feels_like.day;
          } else if (17 < getHours < 20) {
            feels_like = item.feels_like.eve;
          } else if (20 < getHours < 6) {
            feels_like = item.feels_like.night;
          }
          // const getSunriseHours = sunrise.getHours();
          // const getSunsetHours = sunset.getHours();
          // const getSunriseMinutes = sunrise.getMinutes();
          // const getSunsetMinutes = sunset.getMinutes();
          console.log(fulldate);
          console.log(sunrise);
          console.log(sunset);
          return (
            <div key={index} className="app-container">
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0]?.icon}@4x.png`}
                  alt={item.weather[0]?.description}
                />
              </div>

              <div>
                {/*<div>
                   sunrise{" "}
                  {"0" + getSunriseHours + ":" + "0" + getSunriseMinutes} sunset {}
                  {":" + getSunsetMinutes < 10
                    ? "0" + getSunsetMinutes
                    : getSunsetMinutes} 
                </div>*/}
                <div>
                  <h3>{item.weather[0]?.main}</h3>
                  <div>
                    <b>Temperature:</b> {temperature}&deg;C
                  </div>
                  <div>
                    <b>Sunrise</b> {sunrise.slice(0, 5)} <b>Sunset</b>{" "}
                    {sunset.slice(0, 5)}
                  </div>
                  <div>
                    <b>Max:</b> {item.temp.max}&deg;C <b>Min:</b>{" "}
                    {item.temp.min}&deg;C
                  </div>
                  <div>
                    <b>Feels like:</b> {feels_like}&deg;C
                  </div>
                  <div>
                    <b>Pressure:</b> {item.pressure}hPa
                  </div>
                  <div>
                    <b>Humidity: </b>
                    {item.humidity}%
                  </div>
                  <div>
                    <b>UV Index:</b> {item.uvi}{" "}
                  </div>
                  <div>
                    <b>Precipitation:</b> {item.pop * 100}%
                  </div>
                  <div>
                    <b>Wind speed:</b> {item.wind_speed} m/s
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
