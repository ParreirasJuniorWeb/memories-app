import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
    try {
        mongoose.set("strictQuery", true);

        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log("Conectado ao banco de dados!");
    } catch (error) {
        console.log(`Error: ${error}`);
    }   
};
