const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session); // remember to curry and pass the session

const knex = require("../database/dbConfig.js"); // needed for storing sessions into the database

const sessionConfig = {
  name: "dolphin", // 'sid' is default name
  secret: "Keep it safe, keep it secret",
  cookie: {
    maxAge: 1000 * 60 * 10, //cookie valid for 30 seconds
    secure: false, // this should be true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true, //GDPR compliance; laws against setting cookies automatically.
  store: new KnexStore({
    knex,
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 15
  })
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};
