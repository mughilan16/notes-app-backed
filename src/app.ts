import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import notesRoutes from "./routes/notes";

const app = express();

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
};

app.use(errorHandler);

export default app;
