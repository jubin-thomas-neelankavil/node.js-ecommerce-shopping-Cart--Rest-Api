


import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database successfully...');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

const config = {
    app: {
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET_KEY || 'aJ8$u9Wp#2QvR5y$ZtXs&bYv@5nG3zN6',
    },
    database: {
        url: process.env.MONGODB_URI,
    },
    cors: {
        allowedOrigins: process.env.CORS_ALLOWED_ORIGINS || 'http://localhost:27017',
    },
    // Add other configuration options here
};

export { connectDB, config };
    
    



