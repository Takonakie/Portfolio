import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const DATA_PATH = path.resolve(__dirname, "../src/data/portfolio-data.json");
const PROJECT_ROOT = path.resolve(__dirname, "..");

app.post("/api/save", (req, res) => {
  try {
    const { data, commitMessage } = req.body;

    if (!data) {
      return res.status(400).json({ error: "No data provided" });
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
    console.log("✅ portfolio-data.json updated");

    const msg = commitMessage || `chore: update portfolio content [${new Date().toISOString()}]`;

    try {
      execSync("git add .", { cwd: PROJECT_ROOT, stdio: "pipe" });
      execSync(`git commit -m "${msg}"`, { cwd: PROJECT_ROOT, stdio: "pipe" });
      execSync("git push", { cwd: PROJECT_ROOT, stdio: "pipe" });
      console.log("✅ Changes committed and pushed to GitHub");
      res.json({ success: true, message: "Saved & pushed to GitHub" });
    } catch (gitError: any) {
      console.warn("⚠️ Git operation warning:", gitError.message);
      res.json({
        success: true,
        message: "Saved locally (git push skipped or nothing to commit)",
        warning: gitError.message,
      });
    }
  } catch (err: any) {
    console.error("❌ Save failed:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/upload-photo", (req, res) => {
  try {
    const { base64, filename } = req.body;
    if (!base64) {
      return res.status(400).json({ error: "No image data provided" });
    }

    const buffer = Buffer.from(base64.split(",")[1], "base64");
    const ext = filename ? filename.split(".").pop() : "png";
    const savedName = `avatar.${ext}`;
    const savePath = path.resolve(PROJECT_ROOT, "public", savedName);

    fs.writeFileSync(savePath, buffer);
    console.log(`✅ Photo saved to public/${savedName}`);

    res.json({ success: true, photoUrl: `/${savedName}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/data", (_req, res) => {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    res.json(JSON.parse(raw));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Admin API server running on http://localhost:${PORT}`);
});
