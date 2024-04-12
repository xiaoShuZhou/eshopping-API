import { NotFoundError } from "../errors/ApiError";
import User, { UserDocument } from "../models/User";


const getAllUsers = async (): Promise<UserDocument[]> => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Failed to fetch users from the database");
  }
};

const createUser = async (User: UserDocument): Promise<UserDocument> => {
  try {
    return await User.save();
  } catch (error) {
    console.error("Error creating user:", error); 
    throw new Error("Failed to create user");
  }
};

const updateUser = async (userId: string, userData: Partial<UserDocument>): Promise<UserDocument | null> => {
  try {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  } catch (error) {
    throw new NotFoundError();
  }
};

const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return !!deletedUser;
  } catch (error) {
    throw new NotFoundError();
  }
};

const findUserByID = async (userId: string): Promise<UserDocument | null> => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new NotFoundError();
  }
};

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  try {
    return await User.findOne({email});
  } catch (error) {
    throw new NotFoundError("User does not exist");
  }
}



export default { getAllUsers, createUser, updateUser, deleteUser, findUserByID, findUserByEmail};