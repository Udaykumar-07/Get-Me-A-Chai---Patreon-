import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log('Already connected to MongoDB');
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
            socketTimeoutMS: 45000,  // Increase socket timeout
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
