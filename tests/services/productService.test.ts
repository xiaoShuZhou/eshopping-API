import request from 'supertest';
import connect, { MongoHelper } from '../db-helper';
import app from '../../src/app';
import productService from '../../src/services/productService';
import Product from '../../src/models/Product';
import Category from '../../src/models/Category';


async function createCategory(name: string) {
  const category = new Category({ name });
  return await category.save();
}

async function createProduct(data: {
  title: string;
  price: number;
  description: string;
  image: string;
  category: typeof Category;
}) {
  const product = new Product(data);
  return await productService.createProduct(product);
}

describe('product controller test', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  // Create Product
  it('should create a product', async () => {
    const category = await createCategory('category1');
    const productData = {
      title: 'New Product',
      price: 100,
      description: 'Description here',
      image: 'image-url',
      category: category._id
    };
    const newProduct = await createProduct(productData);
    expect(newProduct).toHaveProperty('_id');
    expect(newProduct.title).toEqual(productData.title);
  });

  // Get Product by ID
  it('should return a product by id', async () => {
    const category = await createCategory('category1');
    const productData = {
      title: 'Product',
      price: 50,
      description: 'Description',
      image: 'image-url',
      category: category._id
    };
    const newProduct = await createProduct(productData);
    const fetchedProduct = await productService.getProductById(newProduct._id);
    expect(fetchedProduct?._id).toEqual(newProduct._id);
  });

  // Update Product
  it('should update a product', async () => {
    const category = await createCategory('category1');
    const productData = {
      title: 'Old Product',
      price: 100,
      description: 'Old description',
      image: 'old-image-url',
      category: category._id
    };
    const newProduct = await createProduct(productData);
    const updateData = {
      title: 'Updated Product',
      price: 150,
      description: 'Updated description',
      image: 'updated-image-url'
    };
    const updatedProduct = await productService.updateProduct(newProduct._id, updateData);
    if (updatedProduct) {
      expect(updatedProduct.title).toEqual(updateData.title);
    }
  });

  // Delete Product
  it('should delete a product', async () => {
    const category = await createCategory('category1');
    const productData = {
      title: 'Product to delete',
      price: 100,
      description: 'Description here',
      image: 'image-url',
      category: category._id
    };
    const newProduct = await createProduct(productData);
    await productService.deleteProduct(newProduct._id);
    const deletedProduct = await productService.getProductById(newProduct._id);
    expect(deletedProduct).toBeNull();
  });

  // Filter/Search Products
  // it('should filter products by title', async () => {
  //   const category = await createCategory('category1');
  //   await createProduct({
  //     title: 'Product A',
  //     price: 50,
  //     description: 'Description A',
  //     image: 'image-url-A',
  //     category: category._id
  //   });
  //   await createProduct({
  //     title: 'Product B',
  //     price: 75,
  //     description: 'Description B',
  //     image: 'image-url-B',
  //     category: category._id
  //   });
  //   const filterParams = { title: 'Product A' };
  //   const products = await productService.Products(filterParams);
  //   expect(products.length).toEqual(1);
  //   expect(products[0].title).toEqual('Product A');
  // });
});
