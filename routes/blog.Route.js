import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from "../controllers/blog.Controller.js"

const router = express.Router()

// get all blog => http://localhost:5000/api/v1/blog
router.get("/", getAllBlogs)

// get single blog => http://localhost:5000/api/v1/blog/:id
router.get("/:id", getSingleBlog)

// post blog => http://localhost:5000/api/v1/blog
router.post("/", createBlog)

// update blog => http://localhost:5000/api/v1/blog/:id
router.put("/:id", updateBlog)

// delete blog => http://localhost:5000/api/v1/blog/:id
router.delete("/:id", deleteBlog)

export default router;