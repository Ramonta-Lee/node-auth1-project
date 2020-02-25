const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const sessionConfig = {
  name: "dolphin", // 'sid' is default name
  secret: "Keep it safe, keep it secret",
  cookie: {
    maxAge: 1000 + 30, //cookie valid for 30 seconds
    secure: false, // this should be true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false //GDPR compliance; laws against setting cookies automatically.
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};
