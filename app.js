import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_backend",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
const port = 3000;

const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/todos", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM todo ORDER BY id DESC");

  res.json(rows);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});