import request from 'supertest';
import connect, { MongoHelper } from '../db-helper';
import app from '../../src/app';
import userService from '../../src/services/userService';
import User from '../../src/models/User';

async function createUser(data: {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  userName: string;
  role: string;
  avatar: string;
}) {
  const user = new User(data);
  return await userService.createUser(user);
}

describe('user controller test', () => {
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

  // Create User
  it('should create a user', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
      email: 'john@example.com',
      userName: 'johnny',
      role: 'user',
      avatar: 'avatar-url'
    };
    const newUser = await createUser(userData);
    expect(newUser).toHaveProperty('_id');
    expect(newUser.email).toEqual(userData.email);
  });

  // Get All Users
  it('should return all users', async () => {
    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'password123',
      email: 'jane@example.com',
      userName: 'janey',
      role: 'user',
      avatar: 'avatar-url'
    };
    await createUser(userData);
    const users = await userService.getAllUsers();
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].email).toEqual(userData.email);
  });

  // Update User
  it('should update a user', async () => {
    const userData = {
      firstName: 'Jim',
      lastName: 'Beam',
      password: 'password123',
      email: 'jim@example.com',
      userName: 'jimbo',
      role: 'admin',
      avatar: 'avatar-url'
    };
    const newUser = await createUser(userData);
    const updateData = {
      firstName: 'James'
    };
    const updatedUser = await userService.updateUser(newUser._id, updateData);
    expect(updatedUser.firstName).toEqual('James');
  });

  // Delete User
  it('should delete a user', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
      email: 'john@example.com',
      userName: 'johnny',
      role: 'user',
      avatar: 'avatar-url'
    };
    const newUser = await createUser(userData);
    const result = await userService.deleteUser(newUser._id);
    expect(result).toBeTruthy();
    const deletedUser = await userService.findUserByID(newUser._id);
    expect(deletedUser).toBeNull();
  });

  // Find User by ID
  it('should find a user by ID', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
      email: 'john@example.com',
      userName: 'johnny',
      role: 'user',
      avatar: 'avatar-url'
    };
    const newUser = await createUser(userData);
    const foundUser = await userService.findUserByID(newUser._id);
    expect(foundUser._id).toEqual(newUser._id);
  });

  // Find User by Email
  it('should find a user by email', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
      email: 'john@example.com',
      userName: 'johnny',
      role: 'user',
      avatar: 'avatar-url'
    };
    await createUser(userData);
    const foundUser = await userService.findUserByEmail('john@example.com');
    expect(foundUser.email).toEqual(userData.email);
  });
});
