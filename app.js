import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", (req, res) => {
  res.json([{id:1},{id:2}]);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});