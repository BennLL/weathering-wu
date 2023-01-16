import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";

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
            "&limit=5&appid=49bdc31b415440304250deae9af0e13b"
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
                  "&appid=49bdc31b415440304250deae9af0e13b&units=metric"
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
      <div>
        <input
          type="text"
          className="searchbar"
          placeholder="Enter a city"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
      </div>
      <div>
        <div className="searchresult">
          {result.map((result) => (
            <div key={`${result.lon} ${result.lat}`}>
              <p>
                {result.name + ", " + result.country + ", " + result.state}
                <br />
                {"Latitude: " + result.lat}
                <br />
                {"Longitude: " + result.lon}
              </p>
            </div>
          ))}
        </div>
        <div className="individualresult">
          {individualresult.map((individualresult, index) => (
            <div key={index}>
              <p>
                {"Temperature: " +
                  individualresult.main.temp +
                  "°C, Feels like: " +
                  individualresult.main.feels_like +
                  "°C"}
                <br />
                {"Humidity: " +
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
    </div>
  );
}

export default Searchbar;
