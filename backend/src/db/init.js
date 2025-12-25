import mongoose from 'mongoose'

export function initDatabase() {
    const DATABASE_URL = "mongodb://localhost:27018/weather"; //process.env.DATABASE_URL
    mongoose.connection.on('open', () => {
        console.info("Connected to ", DATABASE_URL)
    })
    const connection = mongoose.connect(DATABASE_URL)
    return connection
}