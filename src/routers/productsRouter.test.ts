const request = require('supertest');
const express = require('express');
const router = require('./productsRouter');

const app = express();
app.use(express.json());
app.use(router);

let products = [
    { id: "1", name: "product1", category: "1", variant: "1", price: 1 },
    { id: "2", name: "product2", category: "2", variant: "1", price: 2 },
    { id: "3", name: "product3", category: "1", variant: "2", price: 3 },
  ];

describe('GET /', () => {
  it('responds with JSON containing all products', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);
  });

  it('responds with a single product if pid is provided', async () => {
    const response = await request(app).get('/?pid=1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products[0]);
  });

  it('responds with 404 if product with provided pid is not found', async () => {
    const response = await request(app).get('/?pid=999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Product not found' });
  });
});

describe('POST /', () => {
  it('adds a new product and responds with updated list', async () => {
    const newProduct = {
      id: '4',
      name: 'newProduct',
      category: '1',
      variant: '1',
      price: 4
    };
    const response = await request(app)
      .post('/')
      .send(newProduct)
      .set('Accept', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(newProduct);
  });

  it('responds with 406 if provided data is incorrect', async () => {
    const response = await request(app)
      .post('/')
      .send({ invalid: 'data' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(406);
  });
});

describe('DELETE /:productId', () => {
  it('deletes a product and responds with updated list', async () => {
    const response = await request(app).delete('/2');
    expect(response.status).toBe(204);
    expect(response.body.message).toBe('Deleted');
    expect(response.body.body).not.toContainEqual(products[1]);
  });

  it('responds with 204 if productId is not found', async () => {
    const response = await request(app).delete('/999');
    expect(response.status).toBe(204);
  });
});
