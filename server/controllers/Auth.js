import bcryptjs from "bcryptjs";
import User from "../models/User.js";

export const Auth = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    console.log(newUser);
    res.status(201).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};
