const spicedPg = require("spiced-pg");
const dbUsername = "postgres";
const dbUserPassword = "posgres";
const database = "imageboard";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUsername}:${dbUserPassword}@localhost:5432/${database}`
);

module.exports.getAllData = () => {
    const q = `SELECT *,(
                SELECT id FROM images
                ORDER BY id ASC
                LIMIT 1) AS "lowestId"
                FROM images
                ORDER BY id DESC
                LIMIT 10`;
    return db.query(q);
};

module.exports.getImageData = (id) => {
    const q = ` SELECT * FROM images
            WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addImage = (url, username, title, desc) => {
    const q = `INSERT INTO images (url, username, title, description)
                VALUES($1, $2, $3, $4)
                RETURNING *`;
    const params = [url, username, title, desc];
    return db.query(q, params);
};

module.exports.getComments = (selectedImageId) => {
    const q = `SELECT * FROM comments
                WHERE image_id = $1
                ORDER BY created_at DESC`;
    const params = [selectedImageId];
    return db.query(q, params);
};

module.exports.addComment = (id, commentText, commentAuthor) => {
    const q = `INSERT INTO comments (comment_author, comment_text, image_id)
                VALUES ($1, $2, $3)`;
    const params = [commentAuthor, commentText, id];
    return db.query(q, params);
};

module.exports.getNextImages = (lowestId) => {
    const q = `SELECT url, title, id, (
                SELECT id FROM images
                ORDER BY id ASC
                LIMIT 1) AS "lowestId"
                FROM images
                WHERE id < $1
                ORDER BY id DESC
                LIMIT 10`;
    const params = [lowestId];
    return db.query(q, params);
};
