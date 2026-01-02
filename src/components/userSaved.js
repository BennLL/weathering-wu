import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { getUserFavoriteCity } from "../api/users";
import CityDetails from "./cityDetails";
import { useQuery } from "@tanstack/react-query"; 

const key = process.env.REACT_APP_WEATHER_API_KEY;

export default function UserSaved() {
    const [token] = useAuth();

    let userId = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.sub || decoded.id || decoded._id;
        } catch (e) {
            console.error("Token error", e);
        }
    }

    const { data: favoriteData } = useQuery({
        queryKey: ['favorites'], 
        queryFn: () => getUserFavoriteCity(userId),
        enabled: !!userId, 
    });

    const savedCity = favoriteData?.favoriteCity; 

    const { data: weatherData } = useQuery({
        queryKey: ['weather', savedCity?.lat, savedCity?.lon], 
        queryFn: async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${savedCity.lat}&lon=${savedCity.lon}&appid=${key}&units=metric`
            );
            return response.json();
        },

        enabled: !!savedCity?.lat && !!savedCity?.lon, 
    });

    if (!token) return null;

    return (
        <div className="saved-weather-container">
            <h2 className="p-4 text-white font-kode">Your Saved Favorite:</h2>
            <CityDetails city={weatherData} />
        </div>
    );
}