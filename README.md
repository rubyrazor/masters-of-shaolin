# Masters of Shaolin

An imageboard where afficionados of Shaolin Kung Fu can upload images, along with a title and a description, of their adored masters and discuss their uploads in a comment section.

</br>

<p align="center">
<img src="/readme-material/landing-page.png" width="400"  alt="Landing page">
<img src="/readme-material/modal.png" width="400" alt="Comment section">
</p>

## Features

The imageboard allows users to

-   upload images along with a title and textual description
-   comment on uploaded pictures in a comment section for each picture which opens by clicking on the image
-   load more pages with pictures by clicking on a more-button

## Stack

[![Vue.js Badge](https://img.shields.io/badge/-Vue.js-4FC08D?style=for-the-badge&labelColor=302d2d&logo=vue.js&logoColor=4FC08D)](#)
[![Node.js Badge](https://img.shields.io/badge/-Node.js-3C873A?style=for-the-badge&labelColor=302d2d&logo=node.js&logoColor=3C873A)](#)
[![Express Badge](https://img.shields.io/badge/-Express-000000?style=for-the-badge&labelColor=f7efef&logo=express&logoColor=000000)](#)
[![Amazon AWS Badge](https://img.shields.io/badge/-Amazon%20AWS-232F3E?style=for-the-badge&labelColor=white&logo=amazon%20aws&logoColor=232F3E)](#)

### Development

The **client-side** is built as a single-page application (SAP) with _Vue.js_. I use the _Browser History API_ to change the url shown in the location bar of the browser whenever the user changes what is displayed.

The **server-side** is built with _Express_ which is hosted in a _Node.js_ runtime environment. I use the _Multer_ middleware to handle multipart image-data upload. _Uid-safe_ allows me to generate unique names for uploading the images and _AWS S3_ as a reliable, centralised and permanent storage solution for the images.

### Security

Denial-of-Service (DOS) attacks are averted by setting an 2MB limit for image-upload. I use the X-Frame-Options HTTP response header to prevent attempts at clickjacking.

## How to use

To fork and work with this project:

1. Clone the repository: `git clone git@github.com:rubyrazor/masters-of-shaolin.git`

2. Go inside the directory: `cd masters-of-shaolin`

3. Install dependencies: `npm install`

4. Start development server: `node server.js`
