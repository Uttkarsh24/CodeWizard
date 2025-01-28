import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/generateToken.helper.js";
import { COOKIE_OPTIONS } from "../constants.js";
import updateRank from "../helpers/updateRank.helper.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            username,
            password: hashedPassword,
        });
        return res
            .status(201)
            .json(new ApiResponse(201, "User registered successfully", user));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new ApiError(400, "User not found");
    }
    const isPasswordCorrect = await comparePassword(password, existingUser.password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password");
    }
    try {
        const token = generateToken(existingUser._id);
        return res
            .status(200)
            .cookie("token", token, COOKIE_OPTIONS)
            .json(new ApiResponse(200, "User logged in successfully", { user: existingUser, token }));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json(new ApiResponse(200, "User logged out successfully"));
});

const dashboard = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId);
    try {
        return res
            .status(200)
            .json(new ApiResponse(200, "User fetched successfully", user));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const addPoints = asyncHandler(async (req, res) => {
    const { points } = req.body;
    if (!points) {
        throw new ApiError(400, "Points are required");
    }
    try {
        const user = await User.findById(req.user.userId);
        user.token += points;
        if (user.token < 0) {
            user.token = 0;
        }
        user.rank = updateRank(user.token);
        await user.save();
        return res
            .status(200)
            .json(new ApiResponse(200, "Points added successfully", user));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    dashboard,
    addPoints
};
