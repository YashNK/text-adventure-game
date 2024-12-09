import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB.js";
import userRoutes from "./routes/user.js";
import gameDataRoutes from "./routes/gameData.js";
import storyRoutes from "./routes/story.js";
import charactersRoutes from "./routes/characters.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigin = process.env.ALLOWED_ORIGIN;
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/game", gameDataRoutes);

app.use("/api/user", userRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/character", charactersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
