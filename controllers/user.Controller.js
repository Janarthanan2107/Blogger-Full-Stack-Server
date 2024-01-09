import USER from "../models/user.Schema.js"

export const getAllUser = async (req, res) => {
    try {
        const allUsers = await USER.find()
        res.status(200).json({ success: true, data: allUsers })
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}

export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const singleUser = await USER.findById(id)

        if (!singleUser) {
            res.status(200).send({ success: true, message: `User not fount in the id : ${id}` })
        } else {
            res.status(200).json({ success: true, data: singleUser })
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}

export const createUser = async (req, res) => {
    try {
        await new USER(req.body).save()
            .then((user) => {
                return res.status(201).json({
                    success: true, message: `Your User successfully created wit the id : ${user._id}`
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

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const findUser = await USER.findById(id);
        if (!findUser) {
            res
                .status(200)
                .json({ success: true, message: `User with the id: ${id} not found` });
        } else {
            await USER.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({
                success: true,
                message: `User with the id: ${id} updated successfully`,
            });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const findUser = await USER.findById(id)

        if (!findUser) {
            res.status(200).json({ success: true, message: `User with the id: ${id} is not found` })
        } else {
            await USER.findByIdAndDelete(id)
            res.status(200).json({ success: true, message: "User deleted successfully!" })
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}