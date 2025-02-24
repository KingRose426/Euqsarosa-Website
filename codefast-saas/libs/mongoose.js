import mongoose from "mongoose";
import user from "@/models/user";
import Board from "@/models/Board";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    console.error("!!! Mongoose Error: " + e.message);
  }
};

export default connectMongo;
