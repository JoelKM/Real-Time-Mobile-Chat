const express = require("express");

const handleError = require('./error-handler');
const AppError = require("../common/app-error");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use("*", (req, res, next) => {
  next(new AppError(404, `Could not handle ${req.method} request in '${req.protocol + '://' + req.get('host') + req.originalUrl}'`));
});
app.use((err, req, res, next) => {
  handleError(err, req, res);
});

module.exports = app;