import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import generateContent from "../helpers/generateContent.helper.js";
import scrambleData from "../dataset/scramble.data.js";
import getScrambleWords from "../helpers/getScrambleWords.helper.js";

const generateQuiz = asyncHandler(async (req, res) => {
    const { title } = req.query;
    if (!title) {
        throw new ApiError(400, "Title is required");
    }
    try {
        const content = await generateContent(`Generate 10 quiz questions on ${title}, in the format of array containing object and each object with question and 4 options, and a correct answer, and the answer should be in the options array`);
        return res
            .status(200)
            .json(new ApiResponse(200, "Quiz generated successfully", content));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const generateScramble = asyncHandler(async (req, res) => {
    try {
        const content = getScrambleWords(scrambleData, 10);
        return res
            .status(200)
            .json(new ApiResponse(200, "Scramble generated successfully", content));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export { generateQuiz, generateScramble };