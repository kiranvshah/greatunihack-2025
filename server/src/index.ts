import "dotenv/config";
import express from "express";
import { prisma } from "./db/client.js";
import apiRoutes from "./api/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", apiRoutes);

const startServer = async () => {
  try {
    console.log("Attempting to connect to database...");
    await prisma.$connect();
    console.log("Database connected successfully 🎉");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();
