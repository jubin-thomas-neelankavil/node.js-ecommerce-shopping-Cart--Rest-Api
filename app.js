import dotenv from 'dotenv';
dotenv.config()
import connectDB from './config/connectdb.js';  
import userRoutes from './routes/userRoutes.js'
import express from 'express';
import cors from 'cors';

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

//cors policy
app.use(cors())

//Database Connection
connectDB(DATABASE_URL)

//JSON
app.use(express.json());

//load route
app.use("/api/user/",userRoutes)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});