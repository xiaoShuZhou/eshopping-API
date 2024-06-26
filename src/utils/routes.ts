import { Express } from "express";
import categoriesRouter from "../routers/categoriesRouter";
import orderRouter from "../routers/orderRouter";
import productsRouter from "../routers/productsRouter";
import userRouter from "../routers/userRouter";
import OrderItemRouter from "../routers/orderItemRouter";

function routes(app: Express) {
  app.use("/api/v1/products", productsRouter);
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/orders", orderRouter);
  app.use("/api/v1/orderItems", OrderItemRouter);
}

export default routes;
