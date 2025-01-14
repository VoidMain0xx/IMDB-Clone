import mongoose from 'mongoose';

const MONGO_URI = "mongodb://127.0.0.1:27017/imdb";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};
