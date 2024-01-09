import express from "express";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import "dotenv/config";
const app = express();
const port = 3000;

const MAX_NAME_LENGTH = 20;
const MAX_PRICE = 1000;
const MIN_PRICE = 0;
const TEMP_WARM = "1";
const TEMP_COLD = "0";

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

app.post("/add", async (req, res) => {
  const errors = {
    name: [],
    price: [],
    temp: [],
  };
  if (req.body.name.length > MAX_NAME_LENGTH) {
    errors.name.push("商品名は20文字以内です。");
  }
  if (req.body.price >= MAX_PRICE || req.body.price <= MIN_PRICE) {
    errors.price.push("価格は999円以内で設定できます。");
  }
  if (req.body.temp !== TEMP_WARM && req.body.temp !== TEMP_COLD) {
    errors.temp.push("温度の選択肢が不正です。");
  }
  if (errors.name.length || errors.price.length || errors.temp.length) {
    return res.render("add", { errors: errors });
  }
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  const sql = `INSERT INTO drinks (name,price,temperature) VALUES(name,${req.body.name}),(price,${req.body.price}),(temperature,${req.body.temp})`;
  await connection.query(sql);
  connection.end();
  res.redirect("/");
});

app.get("/update", (req, res) => {
  res.render("update");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
