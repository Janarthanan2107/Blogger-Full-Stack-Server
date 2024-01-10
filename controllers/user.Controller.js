import USER from "../models/user.Schema.js"
import jwt from "jsonwebtoken";
import crypto from 'crypto';

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
    const { email } = req.body;
    const existingUser = await USER.findOne({ email: email });
    // console.log("existingUser:", existingUser)
    if (existingUser) {
        res.status(400).json("Email already exists");
    } else {
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


// login user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await USER.findOne({ username: username });

        if (!existingUser) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Check if the password matches
        const isPasswordValid = existingUser.password === password;

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate a JWT token
        const secretKey = crypto.randomBytes(32).toString('hex'); // Replace with your actual secret key
        const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: "60s" });

        // Return the token in the response
        res.status(200).json({ success: true, token: token, user: existingUser });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}