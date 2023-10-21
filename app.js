

import dotenv from 'dotenv';
dotenv.config();
import { config ,connectDB} from './config/connect.js';

import usersRoute from './routes/userRoute.js'; // Import it directly without curly braces
import productsRoute from './routes/productRoute.js'; // Import it directly without curly braces
import ordersRoute from './routes/ordersRoute.js'; // Import it directly without curly braces
import { router as cartRoute } from './routes/cartRoute.js'; // Make sure cartRoute is correctly exported in cartRoute.js
import adminRoute from './routes/adminRoute.js'; // Import it directly without curly braces

import express from 'express';
import cors from 'cors';

const app = express();
const port = config.app.port;

// CORS policy
app.use(cors());

// JSON
app.use(express.json());

//connectDB
connectDB();


// Load routes
app.use('/api/users', usersRoute);
app.use('/api/product', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/cart', cartRoute); // Assuming cartRoute is correctly exported as 'router'
app.use('/api/admin', adminRoute); // Import it directly without {}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

