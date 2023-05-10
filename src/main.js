const connectDB = require('./config/db')
require('dotenv').config();

const databaseURL = process.env.DATABASE_URL

await connectDB(databaseURL)

const app = require('./src/config/app');