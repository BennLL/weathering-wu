import { useEffect, useState } from 'react';
import SearchResult from "../components/searchResult.js"
import CityDetails from '../components/cityDetails';
import UserSavedList from '../components/userSavedList';
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { getUserFavoriteCity, getFromSavedCityList } from "../api/users";
import { useQuery } from "@tanstack/react-query";

const key = process.env.REACT_APP_WEATHER_API_KEY;

export default function HomePage() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [individualResult, setIndividualResult] = useState(null);
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

    useEffect(() => {
        setSearch("");
        setResult([]);
        setIndividualResult(null);
    }, [userId])

    // get favorite city
    const { data: favoriteData } = useQuery({
        queryKey: ['favorite', userId],
        queryFn: () => getUserFavoriteCity(userId),
        enabled: !!userId,
    });
    const savedCity = favoriteData?.favoriteCity;

    // get saved list
    const { data: savedList } = useQuery({
        queryKey: ["saved", userId],
        queryFn: () => getFromSavedCityList(userId),
        enabled: !!userId,
    })

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


    // fetching city results
    useEffect(() => {
        let timer = setTimeout(() => {
            if (search.length > 0) {
                fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${key}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log('API response:', data);
                        setResult(data);
                    }).catch(error => {
                        console.log("Error:", error)
                    });
            } else {
                setResult([]);
            }
        }, 400);
        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    // fetching specific cityu result
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

    const activeCity = individualResult || weatherData;

    return (
        <div className='searchBarSection'>
            <div className='relative'>
                <input
                    type="text"
                    value={search}
                    placeholder="Search up a city"
                    className="w-[98%] h-[40px] p-[1%] rounded-lg text-[25px] font-['Kode_Mono'] mono-optical-auto outline-none text-black ml-[1%]"
                    onChange={(e) => setSearch(e.target.value)}>
                </input>
                {search ? <button
                    onClick={() => setSearch("")}
                    className='absolute right-3 top-10 hover:text-red-300'>
                    clear</button> :
                    null}
            </div>

            <SearchResult
                result={result}
                onCityClick={fetchWeatherDetails} >
            </SearchResult>

            {activeCity && (
                <div>
                    <h2 className="p-1 text-white">
                        {`Your ${activeCity === weatherData ? "Saved Favorite:" : "Search Result"}`}
                    </h2>
                    <CityDetails
                        city={activeCity}
                        onClose={individualResult ? () => setIndividualResult(null) : null}
                    />
                </div>
            )}
            <UserSavedList
                cityList={savedList}
                onSelect={fetchWeatherDetails}
            ></UserSavedList>
        </div>
    )
}


