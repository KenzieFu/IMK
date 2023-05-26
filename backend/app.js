const express = require("express");
const bodyParser = require("body-parser");
// const fileupload = require("express-fileupload");
const sequelize = require("./util/database");
const multer = require("multer");
const cors = require("cors");
// const feedRoutes = require('./routes/feed');
const authRoutes = require("./routes/auth");
const perpustakaanRoutes = require("./routes/perpustakaan");
const adminRoutes = require("./routes/admin");
const Buku = require("./models/buku");
const path = require("path");
// const bookController = require("./controllers/buku");

const app = express();


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const fileName = new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
    cb(null, fileName);
  },
});



const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
// app.use(bodyParser.json()); // application/json
app.use(bodyParser.json({ limit: "50mb" })); // set limit to 50mb

// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
// app.use(
//   multer({
//     storage: fileStorage,
//     limits: {
//       fileSize: 1024 * 1024 * 50, // set limit to 50mb
//     },
//     fileFilter: fileFilter,
//   }).single("gambar_buku")
// );

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Set CORS headers
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

// Set CORS headers
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",

//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// app.use(cors())

// app.use(cors({
//   origin:"http://localhost:3000"
// }))

// app.use('/feed', feedRoutes);
// tambah route http://localhost:8080/admin-perpustakaan-methodist-cw/buku --> bukuController.createBook
app.post('/admin-perpustakaan-methodist-cw/buku', upload.single("gambar_buku"), async (req, res, next) => {
 
   console.log(req.file);
   console.log(req.body)
   console.log(req.files);
  // bagaimana dapat mengakses req.file.path di sini

  // console.log(req.file.path);
  try {
    if (!req.file) {
      const error = new Error("Tidak ada gambar yang terupload");
      error.statusCode = 422;
      throw error;
    }

    const { id_buku, judul_buku, pengarang, penerbit, tahun_terbit, id_kategori, sinopsis, isbn } = req.body;
    // const gambar_buku = req.file.path.replace("\\", "/");
    // gambar_buku = "/images/namafile.jpg"
    const gambar_buku = "/" + req.file.path.replace("\\", "/");
    // const gambar_buku = req.file.path;

    const book = await Buku.create({
     /*  id_buku: id_buku, */
      judul_buku: judul_buku,
      pengarang: pengarang,
      penerbit: penerbit,
      tahun_terbit: tahun_terbit,
      id_kategori: id_kategori,
      sinopsis: sinopsis,
      gambar_buku: gambar_buku,
      isbn: isbn,
    });
    // const book = {
    //   id_buku: id_buku,
    //   judul_buku: judul_buku,
    //   pengarang: pengarang,
    //   penerbit: penerbit,
    //   tahun_terbit: tahun_terbit,
    //   id_kategori: id_kategori,
    //   sinopsis: sinopsis,
    //   gambar_buku: gambar_buku,
    //   isbn: isbn,
    // };

    res.json(book);
  } catch (error) {
    next(error);
  }
});
app.use("/auth", authRoutes);
app.use("/perpustakaan-methodist-cw", perpustakaanRoutes);
app.use("/admin-perpustakaan-methodist-cw", adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});




// sequelize
//   .sync()
//   .then(() => {
//     console.log("Connected to database!");
//     app.listen(8080, () => {
//       console.log("Server started on port 8080");
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to database:", error);
//   });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database!");
    app.listen(8080, () => {
      console.log("Server started on port 8080");
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });