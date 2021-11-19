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

// ------------ HELPER MIDDLEWARE ------------
// Logs basic info about all requests.
app.use((req, res, next) => {
    console.log(
        "BASIC INFO ABOUT REQUEST: ",
        `${req.method} request to ${req.url}`
    );
    next();
});

//   ------------ MIDDLEWARE THAT PARSES REQUEST BODIES ------------
// #1 Parses url-encoded request bodies + makes them available as "req.body".
app.use(
    express.urlencoded({
        extended: false,
    })
);

// #2 Parses JSON-format request bodies.
app.use(express.json());

//------------ MIDDLEWARE THAT MODFIES PATH-STRUCTURE ------------
// Specifies a directory to serve static content.
app.use(express.static("./public"));

// ------------ ROUTES ------------
// GET route to retrieve all image-data from DB and send them to the app.js
app.get("/images.json", (req, res) => {
    db.getAllData()
        .then((images) => {
            return res.json(images.rows);
        })
        .catch((err) => {
            console.log("Exception in GET /images: ", err);
        });
});

// GET route to retrieve image-data for specifc image from DB by ID and send it to modal.js
app.get("/image/:id", (req, res) => {
    const { id } = req.params;
    console.log("Logging in app.get(/image/:id): ", id);
    db.getImageData(id)
        .then((data) => {
            console.log("logging in app.get, then: ", data);
            res.json(data.rows[0]);
        })
        .catch((err) => {
            console.log("Exception thrown when retireving data from DB: ", err);
            res.sendStatus(500);
        });
});

// GET route to retrieve comments-data form DB and send them to modal.js
app.get("/comments/:selectedImageId", (req, res) => {
    const { selectedImageId } = req.params;
    db.getComments(selectedImageId)
        .then((data) => {
            res.json(data.rows);
        })
        .catch((err) => {
            console.log(
                "Exception thrown while retrievin comments data from DB: ,",
                err
            );
            res.sendStatus(500);
        });
});

app.get("/nextImages/:lowestId", (req, res) => {
    const { lowestId } = req.params;
    console.log(lowestId);
    db.getNextImages(lowestId)
        .then((data) => {
            res.json(data.rows);
        })
        .catch((err) => {
            console.log("Exception thrown in GET /nextImages/:lowestId: ", err);
            res.sendStatus(500);
        });
});

// POST route to upload image-data to DB
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

app.post("/addcomment/:id", (req, res) => {
    const { id } = req.params;
    const { commentText, commentAuthor } = req.body;

    db.addComment(id, commentText, commentAuthor)
        .then((data) => {
            res.json(data.rows[0]);
        })
        .catch((err) => {
            console.log(
                "Exception thrown when adding a comment to the DB: ",
                err
            );
            res.sendStatus(500);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
