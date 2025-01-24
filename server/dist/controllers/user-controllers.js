import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        // Get all users
        const users = await User.find();
        res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        // User signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(401).send("User already registered");
            return;
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // Create token and store in cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        res.status(201).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        // User login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send("User not registered");
            return;
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(403).send("Incorrect Password");
            return;
        }
        // Create token and store in cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        // User token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("User not registered OR Token malfunctioned");
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
            return;
        }
        res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        // User logout
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("User not registered OR Token malfunctioned");
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
            return;
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map