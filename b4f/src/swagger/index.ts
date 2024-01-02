import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "API Documentation AsciaScalfita",
    version: "0.0.1",
  },
  components: {
    securitySchemes: {
      Authorization: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        value: "Bearer <JWT token here>",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
