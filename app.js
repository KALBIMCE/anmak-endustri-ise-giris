import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) =>
    file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Sadece pdf yükleyebilirsiniz."), false)
}).fields([
  { name: "hizmetDokumu", maxCount: 1 },
  { name: "ikametgah", maxCount: 1 },
  { name: "askerlik", maxCount: 1 },
  { name: "nufusKayit", maxCount: 1 },
  { name: "myk", maxCount: 1 },
  { name: "sabika", maxCount: 1 },
  { name: "diploma", maxCount: 1 }
]);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/upload-documents", (req, res) => {
  upload(req, res, err => {
    if (err) return res.send("HATA: " + err.message);
    res.send("Belgeler başarıyla yüklendi!");
  });
});

app.listen(3000, () =>
  console.log("Anmak Endüstri Evrak Sistemi Çalışıyor: http://localhost:3000")
);
