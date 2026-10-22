import express from "express";
import { userLogin, registerUser } from "../controllers/authController.js";
import { getAllUsers } from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { registerValidation } from "../validators/authValidators.js";

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post("/login", userLogin);

authRoutes.post("/register", validate({ body: registerValidation }), registerUser);

export default authRoutes;
