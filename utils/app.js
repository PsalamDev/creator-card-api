import express from "express";
import cors from "cors";
import creatorCardRoutes from "../endpoints/creatorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", creatorCardRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API running successfully",
  });
});

export default app;