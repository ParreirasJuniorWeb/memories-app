import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import methodOverride from "method-override";
// Middlewares: Implementamos o method-override para burlar as limitações do HTML
// e o morgan para monitorar requisições.
// DB Connection
import { connect } from "./db/conn.js";
// Routes
import memoryRoutes from "./routes.js";

const app = express();
const port = 3000;

// Configurações e Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

// Routes
app.use("/memories", memoryRoutes);

const startServer = async () => {
  await connect();
  app.listen(port, () => console.log(`Rodando em http://localhost:${port}`));
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export { app, startServer };
