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

module.exports.addImage = (url, username, title, desc) => {
    const q = `INSERT INTO images (url, username, title, description)
                VALUES($1, $2, $3, $4)
                RETURNING *`;
    const params = [url, username, title, desc];
    return db.query(q, params);
};