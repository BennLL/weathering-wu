import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { updateFavoriteCity } from "../api/users.js";

function CityDetails({ city, onClose }) {
    const [token] = useAuth();

    let userId = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.sub || decoded.id || decoded._id;
        } catch (e) {
            console.error("Invalid token", e);
        }
    }

    const handleUpdateFavCity = async () => {
        let cityDetail = {
            name: city.name,
            lat: city.lat,
            lon: city.lon
        }
        updateFavoriteCity(userId, cityDetail)
    }
    if (!city || !city.coord || city.length === 0) {
        return null;
    }

    return (
        <div className="cityDetailsSection">

            <div className="cityDetails">
                <div className="flex justify-between items-center w-full">
                    <h1>{city.name}</h1>
                    {token ?
                        <div className="flex gap-2">
                            <button onClick={() => handleUpdateFavCity()} className="text-black hover:text-red-700">
                                ❤︎ㅤ
                            </button>
                            {onClose ?
                                <button onClick={onClose} className="text-black hover:text-red-700">
                                    ✕
                                </button> :
                                null}
                        </div>
                        : null}

                </div>

                <p>Lat: {city.coord.lat}, Lon: {city.coord.lon}</p>
                <p>Condition: {city.weather[0].description}</p>
                <h4><span className="cel">{city.main.temp}°C</span> / <span className="fah">{(city.main.temp * (9 / 5) + 32).toFixed(2)}°F</span></h4>
                <p>Feels like: {city.main.feels_like}°C / {(city.main.feels_like * (9 / 5) + 32).toFixed(2)}°F</p>
                <p>Humidity: {city.main.humidity}%</p>
            </div>
        </div >
    );
}

export default CityDetails