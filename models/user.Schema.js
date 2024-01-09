import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            minLength: [8, "Username should contain at least 8 characters"]
        },
        email: {
            type: String,
            trim: true,
            required: true,
            minLength: [5, "Content must be of at least 5 characters"],
        },
        phNumber: {
            type: Number,
            trim: true,
            required: true,
            minLength: [10, "Phone Number must be of at least 10 characters"],
        },
        image: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const USER = mongoose.model("user", userSchema)

export default USER;