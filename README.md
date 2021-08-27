## Web Scraper - Book Info

### Introduction

![](https://github.com/3n0ugh/Web-Scraper/blob/main/introduction.png)

This module built with nodejs to getting book informations from D&R website.

### Requirements

* [MongoDB](https://www.mongodb.com/try/download/community)
* [Node](https://nodejs.org/en/)

### Packages

* [Axios](https://www.npmjs.com/package/axios)
  * Promise based HTTP client for the browser and node.js
* [Cheerio](https://www.npmjs.com/package/cheerio)
  * Fast, flexible & lean implementation of core jQuery designed specifically for the server.
* [Monk](https://www.npmjs.com/package/monk)
  * A tiny layer that provides simple yet substantial usability improvements for MongoDB usage within Node.JS.

### Instructions

* Clone the repository.
  ```bash
    git clone https://github.com/3n0ugh/Web-Scraper-Book-Info.git
  ```
* Move to the server folder and install npm packages for server.
  ```bash
    npm install
  ```
* Move to src folder than change the URL variable in app.js file with which page you want to download.
* Then run the program
  ```bash
    npm start
  ```
