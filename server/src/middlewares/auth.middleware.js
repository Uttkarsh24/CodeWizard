import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../helpers/generateToken.helper.js";

const authenticateUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized");
    }
});

export default authenticateUser;