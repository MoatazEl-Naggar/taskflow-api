import express, { Application } from "express";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("🚀 TaskFlow API is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
