import express, { Request, Response } from "express";

type Product = {
  id: string;
  name: string;
  category: string;
  variant: string;
  price: number;
};

let products: Product[] = [
  { id: "1", name: "product1", category: "1", variant: "1", price: 1 },
  { id: "2", name: "product2", category: "2", variant: "1", price: 2 },
  { id: "3", name: "product3", category: "1", variant: "2", price: 3 },
];

interface Filters {
  name?: string;
  category?: string;
  variant?: string;
}
interface Query extends Filters {
  offset?: number;
  limit?: number;
  pid?: string;
}

const router = express.Router();
let filters: Filters;

function filterProds(filters: Filters, _products: Product[]): Product[] {
  for (const key in filters) {
    const value = filters[key as keyof Filters]?.toLowerCase();
    if (value) {
      _products = _products.filter((product) =>
        product[key as keyof Filters]?.includes(value)
      );
    }
  }
  return _products;
}

router.get("/", (request: Request, response: Response) => {
  const prodLen = products.length;
  const {
    offset = 0,
    limit = prodLen,
    name,
    category,
    variant,
    pid,
  }: Query = request.query;

  filters = {
    ...(name && { name }),
    ...(category && { category }),
    ...(variant && { variant }),
  };

  if (pid) {
    const product = products.find((p) => p.id === pid);
    if (!product) {
      response.status(404).json({ error: "Product not found" });
    } else {
      response.status(200).json(product);
    }
    response.end();
  } else {
    let _products = filterProds(filters, products);
    const end = Math.min(offset + limit, prodLen);
    _products = _products.slice(offset, end);
    response.status(200).json(_products);
  }
});

router.post("/", (request: Request, response: Response) => {
  try {
    const newProduct: Product = request.body;
    products.push(newProduct);
    response.status(201).json(products).end();
  } catch (e) {
    response
      .status(406)
      .json({ message: "check provided data!", body: request.body })
      .end();
  }
});

router.delete("/:productId", (request: Request, response: Response) => {
  const prodLen = products.length;
  const productId = request.params.productId;
  products = products.filter((item) => item.id !== productId);
  const msg = products.length === prodLen ? "Not found" : "Deleted";
  response.status(204).json({ message: msg, body: products });
});

export default router;
