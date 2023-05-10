const swaggerJsDoc = require("swagger-jsdoc");

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
      apis: ["../users"],
  })