import express from "express"
import {  deleteUser, getAllUsers, nameUpdate, replaceUser } from "../controllers/userController.js";


const userRoutes = express.Router({mergeParams:true})

// userRoutes.get("/",(req,res)=>{
//     res.send ("heloo")
// })
userRoutes.get("/", getAllUsers)
userRoutes.patch("/:id", nameUpdate)
userRoutes.put("/:id",replaceUser)
userRoutes.delete("/:id", deleteUser)

export default userRoutes