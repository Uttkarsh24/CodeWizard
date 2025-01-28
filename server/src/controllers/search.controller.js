import Youtube from "../models/search.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { BASE_YOUTUBE_URL } from "../constants.js";
import { searchYoutube } from "../helpers/searchDataFormater.helper.js";
import Search from "../models/search.model.js";

const search = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  const existingSearch = await Youtube.findOne({ keyword });

  if (!existingSearch) {

    const data = await searchYoutube(keyword);

    
    const sanitizedResults = data.items
      .filter(
        (item) =>
          item.id && item.id.videoId && item.snippet && item.snippet.title
      ) 
      .map((item) => (
        {
        videoId: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        title: item.snippet.title,
        thumbnails: item.snippet.thumbnails?.default || null,
      }));

    if (sanitizedResults.length === 0) {
      return res
        .status(400)
        .json(new ApiResponse(400, "No valid search results found."));
    }

    // Create a new Search document
    const searchResults = await Search.create({
      keyword,
      searchResults: sanitizedResults,
    });

    res.status(200).json(new ApiResponse(200, searchResults));
  } 
  else {
    res.status(200).json(new ApiResponse(200, existingSearch));
  }
});

export { search };
