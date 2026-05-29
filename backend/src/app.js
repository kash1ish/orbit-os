import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import {notFound,errorHandler} from "./middleware/error.middleware.js";
import goalRoutes from "./routes/goal.routes.js";
import projectRoutes from "./routes/project.routes.js";
import noteRoutes from "./routes/note.routes.js";
import journalRoutes from "./routes/journal.routes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/journals", journalRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DevFlow API Running",
  });
});

app.use(notFound);
app.use(errorHandler);
export default app;