import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { getUserFavoriteCity } from "../api/users";
import CityDetails from "./cityDetails";

const key = process.env.REACT_APP_WEATHER_API_KEY;

export default function UserSaved() {
    const [token] = useAuth();
    const [individualResult, setIndividualResult] = useState(null);

    const fetchWeatherDetails = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
            const data = await response.json();
            setIndividualResult(data);
        } catch (error) {
            console.error("City Detail Display Error:", error);
        } 
    };

    useEffect(() => {
        const getSavedAndFetchWeather = async () => {
            if (!token) return;

            try {
                const decoded = jwtDecode(token);
                const userId = decoded.sub || decoded.id || decoded._id;

                const dbResponse = await getUserFavoriteCity(userId);
                const savedCity = dbResponse.favoriteCity;

                if (savedCity && savedCity.lat && savedCity.lon) {
                    await fetchWeatherDetails(savedCity.lat, savedCity.lon);
                } 
            } catch (err) {
                console.error("Initialization error:", err);
            }
        };

        getSavedAndFetchWeather();
    }, [token]);


    return (
        <div className="saved-weather-container">
            <h2 className="p-4 text-white font-kode">Your Saved Favorite:</h2>
            <CityDetails city={individualResult} />
        </div>
    );
}