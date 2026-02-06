// models/Gallery.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ImageSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(), // unique ID for each image
    required: true,
  },
  
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true, // must store Cloudinary public_id for deletion
  },
});

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    images: [ImageSchema],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gallery", GallerySchema);
