import express from "express";
// import User from "../models/user.js";
import { getAllUsers, getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();


// Emplementing custom usrl (/users)

// router.get("/users/all", async (req, res) 
router.get("/all", getAllUsers);


// router.post("/users/new", async (req, res) => {

router.post("/register", register);

router.post("/login", login);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/logout", logout);


// ("/users/userid/special")

// router.get("/userid/special", special);  // not required for project


//// NOT REQUIRED FOR PROJECT


// /userid/lol
// NOTE:: ALWAYS USE DYNAMIC ROUTE AT THE END OF ALL THE GET REQ

// router.route("/userid/:id").get(getUserId).put(updateUserId).delete(deleteUserId);   // not required for project


//("/users/userid/:id")
// router.get("/userid/:id", getUserId);


// router.put("/userid/:id", updateUserId);


// router.delete("/userid/:id", deleteUserId);


export default router;

