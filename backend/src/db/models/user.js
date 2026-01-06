import mongoose, { Schema } from "mongoose"

const citySchema = new Schema({
    name: {type: String, required: true},
    country : {type: String, required: true},
    state: {type: String, default: ""},
    lat: { type: Number, required: true }, 
    lon: { type: Number, required: true },
    
}, { _id: false })

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteCity: citySchema,
    savedCityList: [citySchema],
})

export const User = mongoose.model('User', userSchema)
