import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";

function Searchbar(props) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [city, setCity] = useState([]);

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
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setResult([]);
      }
    }, 1000);

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
        {result.map((result, index) => (
          <div className={`${result.lon} ${result.lat}`}>
            <button className="SearchResult">
              {result.name + ", " + result.country + ", " + result.state}
            </button>
            <div>
                <p className = "lonlat">Latitude: {result.lat} Longitude: {result.lon}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searchbar;
