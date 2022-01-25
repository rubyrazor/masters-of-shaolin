# Masters of Shaolin

An imageboard where afficionados of Shaolin Kung Fu can upload images of their adored masters and discuss their uploads in a comment section. I built the network in an intense one-week project while attending a full-time coding bootcamp with SPICED Academy, Berlin, from Sept 2021 to Dec 2021.

</br>

<p align="center">
<img src="https://user-images.githubusercontent.com/85343170/150962543-c3164046-f08a-48fa-b970-1dfbb2d2f8b7.png" width="400"  alt="Landing page">
<img src="https://user-images.githubusercontent.com/85343170/150963044-ea88815c-df55-4342-bbae-baeb6132f678.png" width="400" alt="Comment section">
</p>

## Features

The imageboard allows users to

-   upload images (along with a title and textual description),
-   comment on pictures in a comment section,
-   load more pictures by clicking on a more-button.

## Stack

[![Amazon AWS Badge](https://img.shields.io/badge/-Amazon%20AWS-232F3E?style=for-the-badge&labelColor=white&logo=amazon%20aws&logoColor=232F3E)](#)
[![Express Badge](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&labelColor=f7efef&logo=express&logoColor=000000)](#)
[![JavaScript Badge](https://img.shields.io/badge/-JavaScript-F0DB4F?style=for-the-badge&labelColor=302d2d&logo=javascript&logoColor=F0DB4F)](#)
[![Node.js Badge](https://img.shields.io/badge/-Node.js-3C873A?style=for-the-badge&labelColor=302d2d&logo=node.js&logoColor=3C873A)](#)
[![Vue.js Badge](https://img.shields.io/badge/-Vue.js-4FC08D?style=for-the-badge&labelColor=302d2d&logo=vue.js&logoColor=4FC08D)](#)

### Development

The **client-side** is built as a single-page application (SAP) with _Vue_. I utilise the _Browser History API_ to change the url shown in the location bar of the browser whenever the user changes what is displayed.

The **server-side** is built with _Express_ and _Node_. I use the _Multer_ middleware to handle multipart image-data upload. _Uid-safe_ allows me to generate unique names for uploading the images and avoiding mix-ups. I use _AWS S3_ as a reliable, centralised and permanent storage solution for the images.

### Security

Denial-of-Service (DOS) attacks are averted by setting an 2MB limit for image-upload. I added a _X-Frame-Options_ HTTP response header to prevent attempts at clickjacking.

## Install & Run

1. Clone repository: `git clone git@github.com:rubyrazor/masters-of-shaolin.git`
2. Navigate into directory: `cd masters-of-shaolin`
3. Install dependencies: `npm install`
4. Run development server: `node server.js`
