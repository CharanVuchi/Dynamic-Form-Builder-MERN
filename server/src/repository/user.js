import bcrypt from "bcrypt";
import UserModel from "../schema/user.js";
import { generateToken } from "../../shared/jwt.js";

export const login_dbServices = async (request) => {
  try {
    const { userName, password } = request;

    const user = await UserModel.findOne({ userName, isDeleted: false }).select("+password");
    if (!user) {
      return { action: 27, data: null, success: false, message: "Invalid username or password" };
    }

    const is_match = await bcrypt.compare(password, user.password);
    if (!is_match) {
      return { action: 27, data: null, success: false, message: "Invalid username or password" };
    }

    if (!user.isVerified) {
      return { action: 3, data: null, success: false, message: "Account is not verified. Please verify your account." };
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken({ uid: user.uid, userName: user.userName, role: user.role, });

    console.log(`User logged in: ${user.userName}`);

    return {
      action: 1010,
      data: {
        uid: user.uid,
        userName: user.userName,
        fullName: user.fullName,
        isVerified: user.isVerified,
        token,
      },
    };
  } catch (error) {
    console.error(`login_dbServices: ${error.message}`);
    throw error;
  }
};

export const register_dbServices = async (request) => {
  try {
    const { userName, password } = request;

    if (!userName || !password) {
      return { action: 25, data: null, success: false, message: "Please fill in the fields to continue." };
    }

    const existing = await UserModel.findOne({ userName });
    if (existing) {
      return { action: 7, data: null, success: false, message: "A user with this username already exists." };
    }

    const user = new UserModel({ userName, password });
    await user.save();

    console.log(`User registered: ${user.userName}`);

    return {
      action: 1001,
      data: {
        uid: user.uid,
        userName: user.userName,
        isVerified: user.isVerified,
      },
    };
  } catch (error) {
    console.error(`register_dbServices: ${error.message}`);
    throw error;
  }
};
