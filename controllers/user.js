import User from "../models/user.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";


export const getAllUsers = async (req, res) => {

    const users = await User.find();
    console.log(req.query);

    // IN POSTMAN QUAERY PARAMS IF I SELECT KEY= KEYWORD & VALUE= SUBHAM , THEN IN ( REQ.QUERY.KEYWORD ) WE'LL GET THE VALUE OF KEYWORD = SUBHAM
    // const keyyy = req.query.keyword;
    // console.log(keyyy);

    res.json({
        success: true,
        message: "Signed up successfully",
        userdata: users,
    });
}


export const login = async (req, res) => {

    const { email, passw } = req.body;

    const user = await User.findOne({ email }).select("+passw");
    // in schema we use default passw select: false, so without write select("+passw") we cant access passw


    if (!user)
        return res.status(404).json({
            success: false,
            message: "user not found",
        });

    const isMatch = await bcrypt.compare(passw, user.passw);

    if (!isMatch)
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });

    sendCookie(user, res, ` Welcome back, ${user.name}`, 200);


};


export const register = async (req, res) => {

    const { name, email, passw } = req.body;

    let user = await User.findOne({ email });

    if (user)
        return res.status(404).json({
            success: false,
            message: "User Already Exist",
        });

    const hashedPassword = await bcrypt.hash(req.body.passw, 10);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        passw: hashedPassword,
    });


    // this part moved to features.js

    // const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    // res.status(201).cookie("token", token, {httpOnly: true, maxAge: 15 * 60 * 1000 }).json({
    //     success: true,
    //     message: "Register successfully",
    // });

    sendCookie(user, res, "Register successfully", 201);
};


export const getMyProfile = async (req, res) => {

// Moved to auth.js
    // const { token } = req.cookies;
    // console.log(token);

    // if(!token) 
    // return res.status(404).json({
    //     success: false,
    //     message: "Login first",
    // });

    
    // const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // const user = await User.findById(decodedData._id);


    res.status(200).json({
        success: true,
        user: req.user,
    });
};


export const logout = async(req, res) => {
    res.status(200).cookie("token", "null", {
        httpOnly: true, expires: new Date(Date.now()) });
    
    res.json({
        success: true,
        message: "Logout successfully",
    })
};



// export const special = (req, res) => {

//     res.json({
//         success: true,
//         message: "just testing",
//     });
// };



// NOT REQUIRED FOR PROJECT

// export const getUserId = async (req, res) => {

//     // const id = req.body.id;

//     // const id = req.query.id;
//     // console.log(req.query);

//     const id = req.params.id;

//     const user = await User.findById(id);

//     console.log(req.params);

//     res.json({
//         success: true,
//         user,
//     });
// };


// export const updateUserId = async (req, res) => {

//     const id = req.params.id;

//     const user = await User.findById(id);

//     res.json({
//         success: true,
//         message: "Updated",
//     });
// }

// export const deleteUserId = async (req, res) => {

//     const id = req.params.id;

//     const user = await User.findById(id);

//     // await User.remove();

//     res.json({
//         success: true,
//         message: "Deleted",
//     });
// }