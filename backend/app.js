const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const multer = require("multer");

// const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const perpustakaanRoutes = require("./routes/perpustakaan");
const adminRoutes = require("./routes/admin");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
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
app.use(bodyParser.json()); // application/json
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use('/feed', feedRoutes);
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
