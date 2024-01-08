import BLOG from "../models/blog.Schema.js"

export const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await BLOG.find()
        res.status(200).json({ success: true, data: allBlogs })
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const singleBlog = await BLOG.findById(id)

        if (!singleBlog) {
            res.status(200).send({ success: true, message: `Blog not fount in the id : ${id}` })
        } else {
            res.status(200).json({ success: true, data: singleBlog })
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}

export const createBlog = async (req, res) => {
    try {
        await new BLOG(req.body).save()
            .then((blog) => {
                return res.status(201).json({
                    success: true, message: `Your Product successfully created wit the id : ${blog._id}`
                })
            })
            .catch((error) => {
                res.status(400).json({
                    success: false, message: `Something went wrong ! error is : ${error}`
                })
            })
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const findBlog = await BLOG.findById(id);
        if (!findBlog) {
            res
                .status(200)
                .json({ success: true, message: `Blog with the id: ${id} not found` });
        } else {
            await BLOG.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({
                success: true,
                message: `Blog with the id: ${id} updated successfully`,
            });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const findBlog = await BLOG.findById(id)

        if (!findBlog) {
            res.status(200).json({ success: true, message: `Blog with the id: ${id} is not found` })
        } else {
            await BLOG.findByIdAndDelete(id)
            res.status(200).json({ success: true, message: "Blog deleted successfully!" })
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}