import request from 'supertest';
import connect, { MongoHelper } from '../db-helper';
import app from '../../src/app';
import categoryService from '../../src/services/categoryService';
import Category from '../../src/models/Category';

async function createCategory(name: string) {
  const category = new Category({ name });
  return await categoryService.createCategory(category);
}

describe('category controller test', () => {
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

  // Create Category
  it('should create a category', async () => {
    const categoryName = 'Electronics';
    const newCategory = await createCategory(categoryName);
    expect(newCategory).toHaveProperty('_id');
    expect(newCategory.name).toEqual(categoryName);
  });

  // Get All Categories
  it('should return all categories', async () => {
    await createCategory('Electronics');
    await createCategory('Books');
    const categories = await categoryService.getAllCategories();
    expect(categories.length).toEqual(2);
  });

  // Get Category by ID
  it('should return a category by id', async () => {
    const categoryName = 'Electronics';
    const newCategory = await createCategory(categoryName);
    const foundCategory = await categoryService.getCategoryById(newCategory._id);
    if (foundCategory) {
      expect(foundCategory._id.toString()).toEqual(newCategory._id.toString());
      expect(foundCategory.name).toEqual(categoryName);
    } else {
      fail('Category not found');
    }
  });

  // Update Category
  it('should update a category', async () => {
    const categoryName = 'Electronics';
    const newCategory = await createCategory(categoryName);
    const updateData = { name: 'Consumer Electronics' };
    const updatedCategory = await categoryService.updateCategory(newCategory._id, updateData);
    if (updatedCategory) {
      expect(updatedCategory.name).toEqual(updateData.name);
    } else {
      fail('Category not found');
    }
  });

  // Delete Category
  it('should delete a category by id', async () => {
    const categoryName = 'Electronics';
    const newCategory = await createCategory(categoryName);
    const result = await categoryService.deleteCategoryById(newCategory._id);
    expect(result).toBeTruthy();
    const deletedCategory = await categoryService.getCategoryById(newCategory._id);
    expect(deletedCategory).toBeNull();
  });
});
