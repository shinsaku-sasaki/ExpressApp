import express from "express";
import mysql from "mysql2/promise";
import "dotenv/config";
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  const sql = "SELECT * FROM drinks";
  const result = await connection.execute(sql);
  res.render("index", { drinks: result[0] });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/update", (req, res) => {
  res.render("update");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
