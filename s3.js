const aws = require("aws-sdk");
const { AWS_KEY, AWS_SECRET } = require("./secrets");
const fs = require("fs");


const s3 = new aws.S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET
});

module.exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("No file on server");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;
    const promise = s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    }).promise();

    promise.then(() => {
        ("Our image is in the cloud!");
        next();
        fs.unlink(path, () => console.log("File removed"));
    }).catch((err) => {
        console.log("Error when uploading", err);
        return res.sendStatus(500);
    });
};