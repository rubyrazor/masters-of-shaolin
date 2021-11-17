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
    console.log(`${req.method} request to ${req.url}`);
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

//Parses JSON-format request bodies
app.use(express.json());

app.get("/images.json", (req, res) => {
    db.getData()
        .then((images) => {
            return res.json(images.rows);
        })
        .catch((err) => {
            console.log("Exception in GET /images: ", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, function (req, res) {
    console.log("req.body: ", req.body);
    const { title, username, desc } = req.body;
    const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;

    console.log("URL: ", url);
    console.log("TITLE: ", title);
    console.log("USERNAME:", username);
    console.log("DESCRIPTION: ", desc);
    db.addImage(url, username, title, desc)
        .then((data) => {
            console.log("Logging in addImage: ", data.rows[0]);
            res.json(data.rows[0]);
        })
        .catch((err) => {
            console.log("Exception when storing data to DB: ", err);
            res.sendStatus(500);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
