

import express from "express";
import { getMyTask, newTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/mytasks", isAuthenticated, getMyTask);


export default router;