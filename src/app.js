const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./path/to/serviceAccountKey.json");

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com",
});

const db = admin.firestore();

const app = express();
const port = 3000; // atau port lain yang Anda inginkan

app.get("/formData", async (req, res) => {
  try {
    // Mengambil data formulir dari Firestore
    const formDataRef = db.collection("formData");
    const formDataSnapshot = await formDataRef.get();

    const formData = [];
    formDataSnapshot.forEach((doc) => {
      formData.push(doc.data());
    });

    res.json(formData);
  } catch (error) {
    console.error("Error fetching formData:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
