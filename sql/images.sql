DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE images(
    id SERIAL primary key,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
