// TO DOs
// #1 Work on query so it retuns a ordered array of images

const spicedPg = require("spiced-pg");
const dbUsername = "postgres";
const dbUserPassword = "posgres";
const database = "imageboard";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUsername}:${dbUserPassword}@localhost:5432/${database}`
);

module.exports.getData = () => {
    const q = "SELECT * FROM images ORDER BY id DESC";
    return db.query(q);
};
