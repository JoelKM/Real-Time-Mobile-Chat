const connectDB = require('./src/config/db');
const app = require('./src/config/app');
require('dotenv').config();

const databaseURL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8000;

async function startServer() {    
    await connectDB(databaseURL)
    
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      })
}

startServer();

setInterval(() => {
    console.log("Still up");
}, 720000)