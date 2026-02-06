const path = require("path");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    const safeName = path.parse(file.originalname).name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_");

    // Save original name in file object
    file.original_name = file.originalname;

    return {
      folder: "aic_kiu_youth_documents_folder",
      resource_type: "raw", // keep raw for docs
      public_id: safeName,
      format: ext,
    };
  },
});

module.exports = multer({ storage });
