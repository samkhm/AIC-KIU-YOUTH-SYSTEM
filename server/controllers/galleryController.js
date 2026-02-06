// controllers/galleryController.js
import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js"; // your cloud storage utility
import fs from "fs/promises"; // promise-based fs module
import path from "path";
import { v4 as uuidv4 } from "uuid";


// Create a gallery with multiple images
// Create gallery with multiple images
export const createGallery = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "At least one image is required" });

    const images = [];

    // Upload each image to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `aic_kiu_youth_galleries/${title}`, // folder per gallery
      });

     

      images.push({
        url: result.secure_url,
        public_id: result.public_id, // MUST save for deletion
        id: uuidv4(),
      });
    }

    // Save gallery to DB
    const newGallery = await Gallery.create({ title, images });

    res.status(201).json({ message: "Gallery created successfully", gallery: newGallery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// Get all galleries
export const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json({ galleries });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single gallery by ID
export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    res.json({ gallery });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single image by image ID
export const getImageById = async (req, res) => {
  try {
    const { galleryId, imageId } = req.params;
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });

    const image = gallery.images.find((img) => img.id === imageId);
    if (!image) return res.status(404).json({ message: "Image not found" });

    res.json({ image });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Delete a single image from a gallery
export const deleteImage = async (req, res) => {
  try {
    const { galleryId, imageId } = req.params;

    const gallery = await Gallery.findById(galleryId);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });

    const image = gallery.images.find((img) => img.id === imageId);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Delete from Cloudinary
    if (image.public_id) {
      try {
        await cloudinary.uploader.destroy(image.public_id, { resource_type: "image" });
      } catch (err) {
        console.error(`Failed to delete image ${image.public_id}`, err);
      }
    }

    // Remove image from DB
    gallery.images = gallery.images.filter((img) => img.id !== imageId);
    await gallery.save();

    res.json({ message: "Image deleted successfully", gallery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Delete entire gallery and all images
export const deleteGallery = async (req, res) => {
  try {
    const { galleryId } = req.params;

    const gallery = await Gallery.findById(galleryId);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });

    // Delete all images from Cloudinary if there are any
    if (gallery.images && gallery.images.length > 0) {
      await Promise.all(
        gallery.images.map(async (img) => {
          if (!img.public_id) return; // skip if missing
          try {
            await cloudinary.uploader.destroy(img.public_id, { resource_type: "image" });
          } catch (err) {
            console.error(`Failed to delete image ${img.public_id}`, err);
          }
        })
      );
    }

    // Delete the gallery document itself, even if images array is empty
    await gallery.deleteOne();

    res.json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





  