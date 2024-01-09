import express from "express";
import { getAllUser, getSingleUser, createUser, updateUser, deleteUser } from "../controllers/user.Controller.js"

const userRouter = express.Router()

// get all user data
// http://localhost:5000/api/v1/user
userRouter.get("/", getAllUser)

// get single user data
// http://localhost:5000/api/v1/user/:id
userRouter.get("/:id", getSingleUser)

// create user
// http://localhost:5000/api/v1/user
userRouter.post("/", createUser)

// update user
// http://localhost:5000/api/v1/user/:id
userRouter.put("/:id", updateUser)

// delete user
// http://localhost:5000/api/v1/user/:id
userRouter.delete("/:id", deleteUser)

export default userRouter