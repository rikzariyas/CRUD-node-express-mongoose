import express from "express"
import {userLogin, registerUser} from "../controllers/authController.js"
import { getAllUsers } from "../controllers/userController.js";

const authRoutes = express.Router({mergeParams:true})


authRoutes.post("/login", userLogin)

authRoutes.post("/register",registerUser)

export default authRoutes