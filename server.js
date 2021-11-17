const express = require("express");
const app = express();
const db = require("./sql/db");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const s3 = require("./s3");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

// Logs basic info about all requests.
app.use((req, res, next) => {
    console.log(
        "BASIC INFO ABOUT REQUEST: ",
        `${req.method} request to ${req.url}`
    );
    next();
});

// Parses url-encoded request bodies + makes them available as "req.body".
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Specifies a directory to serve static content.
app.use(express.static("./public"));

// Parses JSON-format request bodies.
app.use(express.json());

// GET route to retrieve all images from DB and send them as JSON file to the app.js
app.get("/images.json", (req, res) => {
    db.getAllData()
        .then((images) => {
            return res.json(images.rows);
        })
        .catch((err) => {
            console.log("Exception in GET /images: ", err);
        });
});

// GET route to retrieve data from DB by ID
app.get("/image/:id", (req, res) => {
    const { id } = req.params;

    db.getImageData(id)
        .then((data) => {
            res.json(data.rows[0]);
        })
        .catch((err) => {
            console.log("Exception thrown when retireving data from DB: ", err);
            res.sendStatus(500);
        });
});

// POST route to upload image data to DB
app.post("/upload", uploader.single("file"), s3.upload, function (req, res) {
    const { title, username, desc } = req.body;
    const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

    db.addImage(url, username, title, desc)
        .then((data) => {
            res.json(data.rows[0]);
        })
        .catch((err) => {
            console.log("Exception thrown when storing data to DB: ", err);
            res.sendStatus(500);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
