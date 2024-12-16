import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB.js";
import userRoutes from "./routes/user.js";
import storyRoutes from "./routes/story.js";
import charactersRoutes from "./routes/characters.js";
import chapterRoutes from "./routes/chapters.js";
import levelRoutes from "./routes/level.js";
import sceneRoutes from "./routes/scene.js";
import sceneOptionRoutes from "./routes/sceneOption.js";
import monsterRoutes from "./routes/monster.js";
import userChapterRoutes from "./routes/userStory.js";

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

app.use("/api/user", userRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/character", charactersRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/level", levelRoutes);
app.use("/api/scene", sceneRoutes);
app.use("/api/sceneOption", sceneOptionRoutes);
app.use("/api/monster", monsterRoutes);
app.use("/api/user-story", userChapterRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
