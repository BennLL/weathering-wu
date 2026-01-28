import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { removeFromSavedCityList } from "../api/users.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UserSavedList({ cityList = [], onSelect }) {
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

    const handleRemoveFromSavedList = (cityData) => {
        removeFromSavedCityListMutation.mutate(cityData);
    }

    const removeFromSavedCityListMutation = useMutation({
        mutationFn: (cityData) => removeFromSavedCityList(userId, cityData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['saved'] })
        }
    })

    return (
        <div className="saved-list-container ">
            {cityList.length > 0 && (
                <h3 className="saved-list-title">
                    Saved Collection
                </h3>
            )}
            <ul className="saved-list-scroll-area">
                {cityList.length === 0 ? (
                    <>
                        {token ?
                            <h1 className="empty-message">
                                No saved cities yet.
                            </h1>
                            :
                            <h1 className="empty-message">
                                Sign in for more functions
                            </h1>
                        }
                    </>
                ) : (
                    cityList.map((city, index) => (
                        <li
                            key={index}
                            className="saved-city-card"
                            onClick={() => onSelect(city.lat, city.lon)}
                        >
                            <div className="card-header">
                                <h4 className="city-name ">
                                    {city.name}
                                </h4>
                                <button
                                    className="remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFromSavedList(city)
                                    }}
                                >✕</button>
                            </div>

                            <p className="city-location">
                                {city.state ? `${city.state}` : ""}<br />{city.country}
                            </p>

                            <div className="card-footer ">
                                <p className="coord-text ">
                                    Lat: {Number(city.lat).toFixed(2)}
                                </p>
                                <p className="coord-text ">
                                    Lon: {Number(city.lon).toFixed(2)}
                                </p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}