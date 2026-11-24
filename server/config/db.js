import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = `${process.env.MONGO_URI}`;
    const MONGO_TIMEOUT = `${process.env.MONGO_TIMEOUT}`;
    const DB_NAME = `${process.env.MONGO_DB_NAME}`;

    const conn = await mongoose.connect(URI, {
      serverSelectionTimeoutMS: parseInt(MONGO_TIMEOUT),
      dbName: DB_NAME,
    });
    console.log(`MongoDB connected: ${conn.connection.host} → [${DB_NAME}]`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
