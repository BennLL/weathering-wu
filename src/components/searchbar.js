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

            for (var i = 0; i < resData.length; i++) {
              fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                  resData[i].lat +
                  "&lon=" +
                  resData[i].lon +
                  "&appid=49bdc31b415440304250deae9af0e13b"
              )
                .then((response) => response.json())
                .then((responseData) => {
                  console.log(responseData);
                  setIndividualResult([]);
                  for (const key in responseData) {
                    setIndividualResult((beforeResult) => {
                      return [...beforeResult, responseData[key]];
                    });
                  }
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setResult([]);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="Container">
      <header className="Header">Weathering WU</header>
      <div>
        <input
          type="text"
          className="SearchBar"
          placeholder="Enter a city"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
      </div>
      <div>
        {result.map((result) => (
          <div key={`${result.lon} ${result.lat}`}>
            <p>
              {result.name + ", " + result.country + ", " + result.state}
              <br/>
              {"Latitude: " + result.lat + " Longitude: " + result.lon}
            </p>

            {individualresult.map((individualresult) => (
              <p>
                {individualresult.temp}
              </p>
            ))}
            <p>-----------------------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searchbar;
