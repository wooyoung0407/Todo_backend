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
  dateStrings: true,
});

const app = express();
const port = 3000;

const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.get("/:user_code/todos", async (req, res) => {
  const {user_code} = req.params;

  const [rows] = await pool.query(
    `
    SELECT *
    FROM todo
    WHERE user_code = ?
    ORDER BY id DESC
    `,
    [user_code]
  );

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: rows
  });
});


app.get("/:user_code/todos/:no", async (req, res) => {
  const {user_code , no} = req.params;
  const [[todoRow]] = await pool.query(
    `
    SELECT *
    FROM todo
    WHERE user_code =?
    AND no = ?
    `,
    [user_code,no]
  );

  if(todoRow === undefined){
    res.status(404).json({
      resultCode: "F-1",
      msg: "실패",
    });
    return;
  }

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: todoRow,
  });
});

app.post("/todos", async (req, res) => {
  const {content} = req.body;

  if(!content){
    res.status(400).json({
      msg: "content required"
    })
    return;
  }

  const [rs] = await pool.query(
    `
    INSERT INTO todo
    SET reg_date = NOW(),
    update_date = NOW(),
    perform_date = NOW(),
    content = ?,
    `,
    [content]
  );

  res.status(201).json({
    id: rs.insertId,
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});