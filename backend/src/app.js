import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import {
  notFound,
  errorHandler,
} from "./middleware/error.middleware.js";
import goalRoutes from "./routes/goal.routes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DevFlow API Running",
  });
});

app.use(notFound);
app.use(errorHandler);
export default app;