import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { updateFavoriteCity, addToSavedCityList } from "../api/users.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CityDetails({ city, onClose }) {
    const [token] = useAuth();
    const queryClient = useQueryClient();

    let userId = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.sub || decoded.id || decoded._id;
        } catch (e) {
            console.error("Invalid token", e);
        }
    }

    const handleUpdateFavCity = () => {
        favCityMutation.mutate();
    }

    const favCityMutation = useMutation({
        mutationFn: () => updateFavoriteCity(userId, {
            name: city.name,
            country: city.sys?.country || city.countryName,
            state: city.state || "",
            lat: city.coord.lat,
            lon: city.coord.lon
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorite'] });
            if (onClose) {
                onClose()
            }
        }
    })

    const handleAddToSavedList = () => {
        savedCityListMutation.mutate();
    }

    const savedCityListMutation = useMutation({
        mutationFn: () => addToSavedCityList(userId, {
            name: city.name,
            country: city.sys.country,
            state: city?.state,
            lat: city.coord.lat,
            lon: city.coord.lon
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saved"] })
        }
    });

    if (!city || !city.coord || city.length === 0) {
        return null;
    }

    return (
        <div className="city-details-section">
            <div className="cityDetails">
                <div className="city-header">
                    <h1 className="city-title">{city.name}</h1>
                    {onClose ?
                        <div className="action-buttons">
                            {token ?
                                <>
                                    <button onClick={() => handleUpdateFavCity()} className="icon-btn">❤︎
                                    </button>
                                    <button onClick={() => handleAddToSavedList()} className="icon-btn">✚
                                    </button>
                                </>
                                : null}
                            <button onClick={onClose} className="icon-btn">↩
                            </button>
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