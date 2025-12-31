import { useState } from "react";
import CityDetails from "./cityDetails";

const key = process.env.REACT_APP_WEATHER_API_KEY;

function SearchResult({ result }) {
    const [individualResult, setIndividualResult] = useState([]);

    const fetchWeatherDetails = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
            const data = await response.json();
            console.log('weather details', data)
            setIndividualResult(data);
        } catch (error) {
            console.log("City Detail Display Error:", error)
        }
    }

    return (
        <div className="searchResultSection">
            <ul
                className="list">
                {result.length === 0
                    ? null
                    : result.map((city, index) =>
                        <li
                            key={index}
                            className="list-item"
                            onClick={() => {
                                fetchWeatherDetails(city.lat, city.lon);
                            }}>
                            {city.name}, {city.state ? `${city.state},` : ""} {city.country}<br></br> Lat: {city.lat.toFixed(2)} Lon: {city.lon.toFixed(2)}
                        </li>)}
            </ul>
            <CityDetails
                city={individualResult}
                onClose={() => setIndividualResult(null)}
            />
        </div>
    )
}

export default SearchResult