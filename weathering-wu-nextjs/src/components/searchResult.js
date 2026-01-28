function SearchResult({ result = [], onCityClick}) {

    const safeResult = Array.isArray(result) ? result : [];
    return (
        <div className="searchResultSection">
            <ul
                className="searchResultList">
                {safeResult.length === 0
                    ? null
                    : safeResult.map((city, index) =>
                        <li
                            key={index}
                            className="list-item"
                            onClick={() => {
                                onCityClick(city.lat, city.lon, {state: city.state, country: city.country });
                            }}>
                            {city.name}, {city.state ? `${city.state},` : ""} {city.country}<br></br> Lat: {city.lat.toFixed(2)} Lon: {city.lon.toFixed(2)}
                        </li>)}
            </ul>
        </div>
    )
}

export default SearchResult