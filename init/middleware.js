module.exports = (app) => {
    const express = require("express");
    const cookieParser = require("cookie-parser");
    const cors = require("cors");

    // 1. CORS + HEADERS
    app.use(cors({ exposedHeaders: ["Authorization"] }));

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization, Language"
        );
        res.header("Access-Control-Expose-Headers", "Authorization, Language, Location");
        next();
    });

    // 2. PARSERS
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // 3. COOKIES
    app.use(cookieParser());

    // 4. TRUST PROXY
    app.set("trust proxy", 1);
};


