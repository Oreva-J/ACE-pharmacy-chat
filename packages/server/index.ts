import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// For ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve client build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"))
  );
}

app.get("/api/health", (req, res) => {
  res.json({ message: "You are Healthy" });
});

const port = process.env.PORT || 4000;

// ✅ Always listen (Vercel handles this automatically)
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
