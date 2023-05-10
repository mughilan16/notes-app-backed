import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  let status = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    status = error.status;
  }
  res.status(status).json({ error: errorMessage });
};

app.use(errorHandler);

export default app;
