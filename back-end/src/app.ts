import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router as songRouter } from "./contollers/song.controller";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/song", songRouter);

app.listen(port, () => {
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
