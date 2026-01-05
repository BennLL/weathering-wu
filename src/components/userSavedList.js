import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { removeFromSavedCityList } from "../api/users.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UserSavedList({ cityList = [] }) {
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
        <div className="w-full mt-8 ">
            {cityList.length > 0 && (
                <h3 className="text-white text-lg mb-3 pl-2">
                    Saved Collection
                </h3>
            )}
            <ul className="flex overflow-x-auto gap-4 px-2 pb-4 snap-x snap-mandatory hide-scrollbar">

                {cityList.length === 0 ? (
                    <li className="text-gray-400 text-sm w-full text-center">
                        No saved cities yet.
                    </li>
                ) : (
                    cityList.map((city, index) => (
                        <li
                            key={index}
                            className="
                                flex-shrink-0 
                                w-48 h-32 
                                border border-white
                                rounded-xl 
                                p-4 
                                shadow-lg 
                                snap-center 
                                flex flex-col justify-center
                                hover:bg-white/15 transition duration-300
                            "
                        >
                            <div className="flex justify-between items-center w-full">
                                <h4 className="text-white text-lg font-bold truncate">
                                    {city.name}
                                </h4>
                                <button
                                    className="hover:text-red-300"
                                    onClick={() => handleRemoveFromSavedList(city)}
                                >✕</button>
                            </div>


                            <p className="text-gray-300 text-xs truncate mb-2">
                                {city.state ? `${city.state}, ` : ""}{city.country}
                            </p>

                            <div className="mt-auto pt-2 border-t border-white">
                                <p className="text-gray-200">
                                    Lat: {Number(city.lat).toFixed(2)}
                                </p>
                                <p className="text-gray-200">
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