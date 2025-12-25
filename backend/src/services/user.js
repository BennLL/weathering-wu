import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import jwt from 'jsonwebtoken'

export async function createUser({ name, username, password }) {
    const hashedPassWord = await bcrypt.hash(password, 10);
    const user = new User({ name, username, password: hashedPassWord })
    return await user.save();
}

export async function loginUser({ username, password }) {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error("Invalid username!")
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid password!')
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return token;
}

export async function updateFavoriteCity(userId, cityData) {
    return await User.findOneAndUpdate(
        userId,
        {$set: {favoriteCity: cityData}},
        {new: true}
    )
}

export async function addToSavedCityList(userId, cityData){
    return await User.findOneAndUpdate(
        userId,
        {$addToSet: {savedCityList: cityData}},
        {new: true}
    )
}

export async function removeFromSavedCityList(userId, cityName){
    return await User.findOneAndUpdate(
        userId,
        {$pull: {savedCityList: {name: cityName}}},
        {new: true}
    )
}
