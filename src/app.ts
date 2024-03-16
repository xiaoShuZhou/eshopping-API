import express, { Request, Response } from "express";

import productsRouter from "./routers/productsRouter";


const PORT = 8080;

// create a server with express
const app = express();
app.use(express.json());

// method
// endpoint
// data

app.get("/", (request: Request, response: Response) => {
  // logic
  //   response.status(200).send("Hello, World!");
  //   response.status(200).json("Hello, World!");
  response.status(200).json({ message: "Hello world!" });
});

// base endpoint
// http://localhost:8080/api/v1/products/
app.use("/api/v1/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
