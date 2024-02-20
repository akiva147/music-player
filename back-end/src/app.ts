import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";

dotenv.config();
const port = process.env.PORT;

const app = express();

const server = createServer(app);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function shutdown() {
  try {
    console.log("Successfully shutted down the server ");
    // If you have any other cleanup tasks, you can add them here

    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown: " + error);
    process.exit(1);
  }
}
