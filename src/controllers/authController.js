import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const userLogin = async (req, res) => {
  // console.log("hello from routes >>>")
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({
        status: "OK",
        message: "Login successfully",
      });
    } else {
      throw new Error("invalid username or password");
    }
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, age, email, address, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("give valid name,password, email ");
    }
    const userId = uuidv7();
    console.log(userId);    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userId,
      name,
      age,
      address,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      status: "ok",
      message: "successfully registered",
    });
  } catch {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
