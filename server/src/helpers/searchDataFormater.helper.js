import { BASE_YOUTUBE_URL} from "../constants.js";
import User from "../models/user.model.js";

const searchYoutube = async (searchQuery) => {
  const response = await fetch(
    `${BASE_YOUTUBE_URL}/search?part=snippet&maxResults=10&q=${searchQuery}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  
  return data;
};

export { searchYoutube };
