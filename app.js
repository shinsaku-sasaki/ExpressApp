import express from "express";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import "dotenv/config";
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

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
  const errors = {
    name: [],
    price: [],
    temp: [],
  };
  res.render("add", { errors: errors });
});

app.post("/add", (req, res) => {
  const errors = {
    name: [],
    price: [],
    temp: [],
  };
  if (!req.body.name.trim()) {
    errors.name.push("商品名は必須です。");
  }
  if (req.body.name.length > 20) {
    errors.name.push("商品名は20文字以内です。");
  }
  if (errors.name.length) {
    return res.render("add", { errors: errors });
  }
  res.redirect("/");
});

app.get("/update", (req, res) => {
  res.render("update");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
