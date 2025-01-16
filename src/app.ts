import express, { Application, Request, Response } from "express";
import cors from "cors";
import cockieParser from "cookie-parser";
import path from "path";
import notFound from "./app/middleware/notFound";
const app: Application = express();

// parser
app.use(express.json());
app.use(cockieParser());

// cors
const allowedOrigins = ["http://localhost:3000"]; // Production frontend
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "..", "build")));

// Test route
app.get("/", async (req: Request, res: Response) => {
  const message = "Coality server is running";
  res.send(message);
});

// Catch-all route for client-side routing
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});


// not found route
app.use(notFound)

export default app;
