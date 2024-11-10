const pathToRouteFile = new URL(
  "../routers/v1/*.js",
  import.meta.url
).pathname.slice(1);

console.log("Path is: ", pathToRouteFile);

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Image gram API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: [pathToRouteFile],
};
