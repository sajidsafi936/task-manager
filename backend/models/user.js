const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            trim: true,
        },

        profilePicture: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);