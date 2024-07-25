import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import { resolve } from "path";
import csrf from "csrf";
import cors from "cors";
import authRoute from "./modules/auth/authRoute.js";
import helmet from "helmet";
import dashboardRoute from "./modules/dashboard/dashboardRoute.js";

const tokens = new csrf();
const secret = tokens.secretSync();

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  const { csrf } = req.headers;
  if (req.method !== "GET" && !tokens.verify(secret, csrf)) {
    return res.status(403).json({ error: "Jeton CSRF invalide !" });
  }
  next();
});

// MySQL Connection
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "garage_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

app.use(authRoute);
app.use(dashboardRoute);

app.get("/api/csrf-token", (req, res) => {
  // Générer un jeton CSRF
  const csrfToken = tokens.create(secret);
  // Renvoyer le jeton CSRF dans la réponse
  res.json({ csrfToken });
});

const __dirname = process.cwd();

app.use(express.static(resolve(__dirname, "./client/dist")));
app.get("*", (_, res) => {
  res.sendFile(resolve(__dirname, "./client/dist/index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
