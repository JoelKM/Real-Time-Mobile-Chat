const express = require("express");
const swaggerUI = require("swagger-ui-express");

const swaggerSpecs = require('./documentation-specs');

const handleError = require('./error-handler');
const AppError = require("../common/app-error");

const PORT = process.env.PORT || 8000;

const app = express();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", require("../user"));

app.use("*", (req, res, next) => {
  next(new AppError(404, `Could not handle ${req.method} request in '${req.protocol + '://' + req.get('host') + req.originalUrl}'`));
});
app.use((err, req, res, next) => {
  handleError(err, req, res);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = app;