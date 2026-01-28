"use client";

import { useEffect, useState } from 'react';
import SearchResult from "../../components/searchResult.js"
import CityDetails from '../../components/cityDetails.js';
import UserSavedList from '../../components/userSavedList.js';
import { useAuth } from "../../contexts/AuthContext.js";
import { jwtDecode } from "jwt-decode";
import { getUserFavoriteCity, getFromSavedCityList } from "../../api/users.js";
import { useQuery } from "@tanstack/react-query";

const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

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
        const timer = setTimeout(() => {
            setSearch("");
            setResult([]);
            setIndividualResult(null);
        }, 0);
        return () => clearTimeout(timer);
    }, [userId]);

    // get user favorite city
    const { data: favoriteData } = useQuery({
        queryKey: ['favorite', userId],
        queryFn: () => getUserFavoriteCity(userId),
        enabled: !!userId,
    });
    const savedCity = favoriteData?.favoriteCity;

    // get user saved list
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
                        if (Array.isArray(data)) {
                            setResult(data);
                        } else {
                            setResult([]);
                        }
                        console.log('API response:', data);
                        setResult(data || []);
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

    const fetchWeatherDetails = async (lat, lon, locationInfo = {}) => {
        try {
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
            const weatherData = await weatherResponse.json();

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
            const forecastData = await forecastResponse.json();

            const mergedData = {
                ...weatherData,
                forecastList: forecastData.list || [],
                state: locationInfo.state || "",
                countryName: locationInfo.country,
            }
            console.log('weather details', mergedData, forecastData)
            setIndividualResult(mergedData);
        } catch (error) {
            console.log("City Detail Display Error:", error)
        }
    }

    const activeCity = individualResult || weatherData;

    return (
        <div>
            <div className='input-wrapper'>
                <input
                    type="text"
                    value={search}
                    placeholder="Search up a city"
                    className="search-input"
                    onChange={(e) => setSearch(e.target.value)}>
                </input>

                {search ? (
                    <button
                        onClick={() => setSearch("")}
                        className='clear-btn'
                    >
                        clear
                    </button>
                ) : null}
            </div>

            <SearchResult
                result={result}
                onCityClick={fetchWeatherDetails} >
            </SearchResult>

            {activeCity && (
                <div key={activeCity.name} className="refresh-anim">
                    <h2 className='activity'>
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