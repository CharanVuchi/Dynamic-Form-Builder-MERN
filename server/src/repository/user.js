import bcrypt from "bcrypt";
import  UserModel from "../schema/user";
import { generateToken } from "../../shared/jwt";


export const login_dbServices = async (request) => {
  try {
    const { Email, Password } = request;

    const user = await UserModel.findOne({ Email, IsDeleted: false }).select("+Password");
    if (!user) {
      return { success: false, status: 401, message: "Invalid email or password" };
    }

    const is_match = await bcrypt.compare(Password, user.Password);
    if (!is_match) {
      return { success: false, status: 401, message: "Invalid email or password" };
    }

    if (!user.IsVerified) {
      return { success: false, status: 403, message: "Email not verified. Please verify your account." };
    }

    const token = generateToken({ uid: user.uid, email: user.Email });

    console.log(`User logged in: ${user.Email}`);

    return {
      success: true,
      status: 200,
      message: "Login Successful",
      data: {
        uid: user.uid,
        email: user.Email,
        full_name: user.FullName,
        is_verified: user.IsVerified,
      },
      token,
    };
  } catch (error) {
    logger.error(`login_dbServices: ${error.message}`);
    throw error;
  }
};

