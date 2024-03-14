// express
import express, { Request, Response } from "express";

import productsRouter from "./routers/productsRouter";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
// };

// // fake database
// let products: Product[] = [
//   { id: "1", name: "product1", price: 1 },
//   { id: "2", name: "product2", price: 2 },
//   { id: "3", name: "product3", price: 3 },
// ];

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
// app.use("/api/v1/users", usersRouter);

// app.get("/api/v1/products", (request: Request, response: Response) => {
//   response.status(200).json(products);
//   // response of user and order
//   //  response.status(200).json(users);
//   //  response.status(200).json(order);
// });

// app.post("/api/v1/products", (request: Request, response: Response) => {
//   // post - create new product
//   // request.body: get data from request
//   const newProduct = request.body;
//   console.log(newProduct, "new");
//   products.push(newProduct);
//   response.status(201).json(products);
// });

// delete
// app.delete(
//   "/api/v1/products/:productId",
//   (request: Request, response: Response) => {
//     // logic
//     const productId = request.params.productId;
//     console.log(request.params, "p");
//     products = products.filter((item) => item.id !== productId);
//     // response.status(200).json({ message: "delete successfully" });
//     // response.status(204).end();
//     response.sendStatus(204);
//   }
// );

// users
// orders
// category

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
