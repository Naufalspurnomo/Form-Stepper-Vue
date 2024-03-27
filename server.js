const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const fs = require("fs-extra");
const app = express();
const path = require("path");
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
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const fieldName = file.fieldname;
    const fileName = `${fieldName}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
const multipleUpload = upload.fields([
  { name: "datadiri" },
  { name: "gambaranposisi" },
]);


app.post("/uploads", multipleUpload, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  res.send("Files uploaded successfully.");
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

app.get("/formData", (req, res) => {
  client.query("SELECT * FROM formdata", (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/uploads/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "uploads", fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading image file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
