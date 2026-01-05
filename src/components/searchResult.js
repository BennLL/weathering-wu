function SearchResult({ result, onCityClick}) {
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
                                onCityClick(city.lat, city.lon);
                            }}>
                            {city.name}, {city.state ? `${city.state},` : ""} {city.country}<br></br> Lat: {city.lat.toFixed(2)} Lon: {city.lon.toFixed(2)}
                        </li>)}
            </ul>
        </div>
    )
}

export default SearchResult