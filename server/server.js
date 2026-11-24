import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import Routes from "./src/routes/index.js";

const app = express();

const parseEnvArray = (value) => (value ? value.split(",").map((i) => i.trim()) : []);

app.use(
  cors({
    origin: parseEnvArray(process.env.ORIGIN),
    methods: parseEnvArray(process.env.METHODS),
    allowedHeaders: parseEnvArray(process.env.ALLOWED_HEADERS),
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(process.env.BASE_URL, Routes);

connectDB();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

app.listen(port, host, () => {
  const lines = [``, `  🚀  Server ready`, ``, `  URL      →  http://${host}:${port}${process.env.BASE_URL}`, `  DATABASE →  ${process.env.MONGO_DB_NAME}`, ``];

  const width = Math.max(...lines.map((l) => l.length)) + 2;
  const border = "─".repeat(width);
  const c = "\x1b[36m";
  const r = "\x1b[0m";

  console.log(`\n${c}┌${border}┐${r}`);
  lines.forEach((line) => {
    console.log(`${c}│${r}${line}${" ".repeat(width - line.length)} ${c}│${r}`);
  });
  console.log(`${c}└${border}┘${r}\n`);
});
