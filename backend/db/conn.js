import mongoose from "mongoose";
import dotenv from "dotenv";
import { setServers } from "node:dns";

dotenv.config();

export async function connect() {
    try {
        // Força o uso do DNS público para não falhar no querySrv
        setServers(["8.8.8.8", "1.1.1.1"]);
        mongoose.set("strictQuery", true);

        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log("Conectado ao banco de dados!");
    } catch (error) {
        console.log(`Error: ${error}`);
    }   
};
