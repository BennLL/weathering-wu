import { initDatabase } from "./db/init.js"
import { User } from "./db/models/user.js";
import { addToSavedCityList, updateFavoriteCity, removeFromSavedCityList } from "./services/user.js";

await initDatabase();

await User.deleteMany({});

const user = new User({
    name: "ethan",
    username: "Ethan123",
    password: "ethan123123123123",

    favoriteCity: {
        name: "Temple",
        lat: -97.3431,
        lon: 31.0982,
    },

    savedCityList: [
        {
            name: "Arcadia",
            lat: -118.0353,
            lon: 34.1397,
            state: "California",
        }
    ]
});

await user.save();

const users = await User.find();
console.log("Database Entry:", JSON.stringify(users, null, 2));

const savedUser = await user.save();
const userId = savedUser._id; 

console.log("--- Starting Service Tests ---");

const cityToAdd = {
    name: "New York",
    lat: 40.7128,
    lon: -74.0060
};

const cityToAdd2 = {
    name: "Shanghai",
    lat: 31.2323,
    lon: 121.4692
};

await addToSavedCityList(userId, cityToAdd);
console.log("✅ City Added: NewYork");

await addToSavedCityList(userId, cityToAdd2);
console.log("✅ City Added: Shanghai");

const newFavorite = {
    name: "London",
    lat: 51.5074,
    lon: -0.1278
};
await updateFavoriteCity(userId, newFavorite);
console.log("✅ Favorite Updated to London");

await removeFromSavedCityList(userId, "Arcadia");
console.log("✅ City Removed: Arcadia");

const finalUser = await User.findById(userId);
console.log("Final User State:", JSON.stringify(finalUser, null, 2));