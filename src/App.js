import React from "react";
import { useState } from "react";
import { GEO_API_URL, geoAPIoptions } from "./components/geocityAPI";
import "./App.css";

// const APIrelated ={
//   key:"49bdc31b415440304250deae9af0e13b",
// }

function App() {
  const [search, setSearch] = useState("");
  const [City, setCity] = useState({});

  const searchPressed = () => {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        search +
        "&limit=5&appid=49bdc31b415440304250deae9af0e13b"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCity(result);
      });

    // fetch(`${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${search}`, geoAPIoptions)
    //   .then((response) => response.json())
    //   .then((response) => setCity(response))
    //   .catch((err) => console.error(err));
  };

  return (
    <div className = "Container">
      <header className="Header">Weathering WU</header>
      <div>
        <input
          type="text"
          className="SearchBar"
          placeholder="Enter a city"
          onChange={(e) => setSearch(e.target.value)}
        ></input>

        <button onClick={searchPressed}>Search</button>
      </div>

      <div>DropdownMenu placeholder</div>

      <p>{City[0].name}</p>
      <p>Longitude: {City[0].lon}</p>
      <p>Latitude: {City[0].lat}</p>

      <h2 className="Temp">Temperature Place holder</h2>

      <h2 className="Condition">Condition Place holder</h2>
    </div>
  );
}

export default App;

/*
  TO DO:
  - differnt cities with same name
  - Styling
  - Search bar
  - implement lat lon and weather api
*/
