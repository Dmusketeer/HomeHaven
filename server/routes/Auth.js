import express from "express";
const router = express.Router();
import { Auth } from "../controllers/Auth.js";

router.post("/signup", Auth);

export default router;
