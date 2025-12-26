import mongoose, { mongo } from "mongoose";
import { describe, expect, test } from '@jest/globals'
import { addToSavedCityList, createUser, removeFromSavedCityList, updateFavoriteCity } from "../services/user.js";
import { User } from "../db/models/user.js";

describe('creating user', () => {

    let globalUser;
    const testCities = [
        {
            name: "London",
            lat: 51.5074,
            lon: -0.1278
        },
        {
            name: "Tokyo",
            lat: 35.6895,
            lon: 139.6917
        },
        {
            name: "Sydney",
            lat: -33.8688,
            lon: 151.2093
        }
    ];

    beforeEach(async () => {
        await User.deleteMany({});

        globalUser = await createUser({
            name: "Global Test",
            username: "global_user",
            password: "password123"
        });
    });


    test('with all parameters should succeed', async () => {
        expect(globalUser._id).toBeInstanceOf(mongoose.Types.ObjectId);
        const foundUser = await User.findById(globalUser._id);
        expect(foundUser.username).toBe(globalUser.username);
        expect(foundUser.name).toBe(globalUser.name);
        expect(foundUser.password).toBeDefined();
        expect(globalUser.password).not.toBe("password123");
    })

    test("without name should fail", async () => {
        const user = {
            name: "",
            username: "TestUser123sdjhkfjkshdfasdlkj",
            password: "password123"
        }

        try {
            await createUser(user);
        } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        }
    });

    test("Adding a favorite city should work", async () => {
        await updateFavoriteCity(globalUser._id, { name: "New York", lat: 40.713, lon: -74.006 })
        const updatedUser = await User.findById(globalUser._id);
        expect(updatedUser.favoriteCity).toMatchObject({
            name: "New York",
            lat: 40.713,
            lon: -74.006
        });
    })

    test("Adding cities to saved city list should work", async () => {
        for (let i = 0; i < testCities.length; i++) {
            await addToSavedCityList(globalUser._id, testCities[i]);
        }

        const updatedUser = await User.findById(globalUser._id);
        expect(updatedUser.savedCityList.length).toEqual(3);
        expect(updatedUser.savedCityList[1]).toMatchObject({
            name: "Tokyo",
            lat: 35.6895,
            lon: 139.6917
        },)
    })

    test("Deleting a city from the list should work", async () => {
        for (let i = 0; i < testCities.length; i++) {
            await addToSavedCityList(globalUser._id, testCities[i]);
        }

        await removeFromSavedCityList(globalUser._id, "Tokyo")

        const updatedUser = await User.findById(globalUser._id);
        expect(updatedUser.savedCityList.length).toEqual(2);
        expect(updatedUser.savedCityList[1]).toMatchObject({
            name: "Sydney",
            lat: -33.8688,
            lon: 151.2093
        },)
    })

    test("Retrieving user's name should work", async () => {
        const user = await User.findById(globalUser._id);
        expect(user.name).toMatch("Global Test")
    })
})