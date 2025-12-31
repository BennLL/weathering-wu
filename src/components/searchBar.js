import { useEffect, useState } from 'react';
import SearchResult from './searchResult';
import UserSaved from './userSaved';

const key = process.env.REACT_APP_WEATHER_API_KEY;

function SearchBar() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    useEffect(() => {
        let timer = setTimeout(() => {
            if (search.length > 0) {
                fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${key}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log('API response:', data);
                        setResult([]);
                        for (const key in data) {
                            let city = data[key].name;
                            if (city.slice(0, search.length).indexOf(search !== -1)) {
                                setResult((prevResult) => {
                                    return [...prevResult, data[key]]
                                });
                            }
                        }
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

    return (
        <div className='searchBarSection'>
            <input
                type="text"
                placeholder="Search up a city"
                className="w-[97%] h-[40px] p-[1%] rounded-lg text-[25px] font-['Kode_Mono'] mono-optical-auto outline-none text-black"
                onChange={(e) => setSearch(e.target.value)}>
            </input>
            <SearchResult result={result}></SearchResult>
            <UserSaved></UserSaved>
        </div>
    )
}

export default SearchBar
