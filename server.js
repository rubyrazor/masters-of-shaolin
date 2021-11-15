const express = require("express");
const app = express();
const db = require("./sql/db");

app.use(express.static("./public"));

//Parses JSON-format request bodies
app.use(express.json());

app.get("/images.json", (req, res) => {
    db.getData()
        .then((images) => {
            res.json(images.rows);
        })
        .catch((err) => {
            console.log("Exception in GET /images: ", err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
