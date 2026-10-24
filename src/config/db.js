import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    const dbName = process.env.DATABASE;
    if (!mongoUri) throw new Error("MONGO_URI not defined in .env");
    if (!dbName) throw new Error("DATABASE not defined in .env");

    await mongoose.connect(mongoUri, { dbName });

    console.log("mongodb connection successful✅");
    console.log(`database ${mongoose.connection.name}🌏`);
  } catch (error) {
    console.error(`error ${error.message}`);
    throw new Error("mongodb connection failed❌")
  }
};
export default connectDB;

