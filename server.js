const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const fs = require("fs-extra");
const app = express();

const multer = require("multer");
const port = 3000;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

app.use(express.static("public"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/datadiri");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/upload/datadiri", upload.single("datadiri"), (req, res) => {
  if (req.file) {
    // alert("Foto terupload");
  }
});

app.post("/submitFormData", (req, res) => {
  const formData = req.body;
  const status = formData.status !== undefined ? formData.status : 0;

  // Menyimpan formData ke database
  client.query(
    "INSERT INTO formdata (body, status) VALUES ($1, $2)",
    [formData, status],
    async (err) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Data inserted successfully");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
