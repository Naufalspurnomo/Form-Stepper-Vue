const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Ganti "*" dengan domain Anda jika tidak ingin memberi akses kepada semua domain
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const client = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "12345",
});

client.connect();

app.post("/submitFormData", (req, res) => {
  const formData = req.body;

  // Menyimpan formData ke database
  client.query(
    "INSERT INTO formdata (body, status) VALUES ($1, $2)",
    [formData, 1], // Sesuaikan dengan nilai status yang sesuai
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Data inserted successfully");
        res.status(200).send("Data inserted successfully");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
