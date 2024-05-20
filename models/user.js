import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passw: {
        type: "string",
        required: true,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const User = new mongoose.model("User", schema);

export default User;
