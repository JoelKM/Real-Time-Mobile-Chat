const swaggerJsDoc = require("swagger-jsdoc");
const path = require('path');

module.exports = swaggerJsDoc({
    definition: {
          openapi: "3.0.0",
          info: {
              title: "Mobile Chat API",
              version: "1.0.0",
              description: "The API for a Mobile Chat App",
          },
          servers: [
              {
                url: "http://localhost:8000",
              },
          ],
      },
      apis: [path.join(__dirname, "..", "user", "*.js")],
  })