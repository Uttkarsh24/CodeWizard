import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
    {
      keyword: {
        type: String,
        required: true,
        unique: true, 
        trim: true
      },
      searchResults: [
        {
          videoId: { type: String, required: true },
          title: { type: String, required: true },
          thumbnails: {
              url: { type: String },
              width: { type: Number },
              height: { type: Number }
          },
        }
      ],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
  );

const Search = mongoose.model("Search", searchSchema);

export default Search;