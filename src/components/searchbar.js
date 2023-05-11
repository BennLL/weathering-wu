import React, { useState, useEffect } from "react";
const key = process.env.REACT_APP_WEATHER_API_KEY;

function Searchbar(props) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [individualresult, setIndividualResult] = useState([]);

  // Lat Lon fetch api
  useEffect(() => {
    let timer = setTimeout(() => {
      if (search.length > 0) {
        fetch(
          "http://api.openweathermap.org/geo/1.0/direct?q=" +
            search +
            "&limit=5&appid=" + key
        )
          .then((res) => res.json())
          .then((resData) => {
            setResult([]);
            console.log(resData);
            for (const key in resData) {
              let city = resData[key].name;
              if (city.slice(0, search.length).indexOf(search !== -1)) {
                setResult((prevResult) => {
                  return [...prevResult, resData[key]];
                });
              }
            }
            setIndividualResult([]);
            for (var i = 0; i < resData.length; i++) {
              fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                  resData[i].lat +
                  "&lon=" +
                  resData[i].lon +
                  "&appid=" + key + "&units=metric"
              )
                .then((response) => response.json())
                .then((responseData) => {
                  console.log(responseData);
                  setIndividualResult((beforeResult) => {
                    return [...beforeResult, responseData];
                  });
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setResult([]);
        setIndividualResult([]);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="container">
      <header className="header">Weathering WU</header>
      <br />
      <div>
        <input
          type="text"
          className="searchbar"
          placeholder="Enter a city"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
      </div>
      {result.length > 0 && (
        <div>
          <div className="result">
            {result.map((result, index) => (
              <div key={index}>
                <p>
                  {"Country: " + result.country}
                  <br />
                  {"City: " + result.name}
                  <br />
                  {"State: " + result.state}
                  <br />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {individualresult.length > 0 && (
        <div>
          <div className="individualresult">
            {individualresult.map((individualresult, index) => (
              <div key={index}>
                <p>
                  {"Longitude: " +
                    individualresult.coord.lon +
                    ", Latitude: " +
                    individualresult.coord.lat}
                  <br />
                  {"Temperature: " +
                    individualresult.main.temp +
                    "°C, Feels like: " +
                    individualresult.main.feels_like +
                    "°C," +
                    " Humidity: " +
                    individualresult.main.humidity +
                    "% "}
                  <br />
                  {"Condition: " +
                    individualresult.weather[0].main +
                    ", Description: " +
                    individualresult.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  );
}

export default Searchbar;
