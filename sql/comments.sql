DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL primary key,
    comment_author VARCHAR NOT NULL,
    comment_text VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_id INT REFERENCES images(id)
)
