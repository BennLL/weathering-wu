function CityDetails({ city }) {
    return (
        <div className="cityDetailsSection">
            {city.length === 0 ? null : (
                <div className="cityDetails">
                    <h1>{city.name}</h1>
                    <p>Lat: {city.coord.lat}, Lon: {city.coord.lon}</p>
                    <p>Condition: {city.weather[0].description}</p>
                    <h4><span className="cel">{city.main.temp}°C</span> / <span className="fah">{(city.main.temp * (9 / 5) + 32).toFixed(2)}°F</span></h4>
                    <p>Feels like: {city.main.feels_like}°C / {(city.main.feels_like * (9 / 5) + 32).toFixed(2)}°F</p>
                    <p>Humidity: {city.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}

export default CityDetails