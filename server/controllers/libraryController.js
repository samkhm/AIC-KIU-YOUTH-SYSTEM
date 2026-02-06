const Library = require("../models/Library");
const cloudinary = require("../config/cloudinary");

const path = require("path");


exports.createLibrary = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!req.file) return res.status(400).json({ message: "File is required" });

    const newDoc = await Library.create({
      title,
      file: {
        url: req.file.path,
        format: req.file.mimetype.split("/")[1], // "pdf", "docx", etc.
        size: req.file.size,
        public_id: req.file.filename,
        original_name: req.file.original_name, // save original name
      },
    });

    return res.status(201).json({ file: newDoc });
  } catch (error) {
    console.error("Create Library Error:", error);
    return res.status(500).json({ message: "Failed to create library" });
  }
};






/* ------------------- GET ALL DOCUMENTS ------------------- */
exports.getLibraries = async (req, res) => {
  try {
    const libraries = await Library.find().sort({ createdAt: -1 });
    return res.status(200).json({ files: libraries });
  } catch (error) {
    console.error("Get Libraries Error:", error);
    return res.status(500).json({ message: "Failed to fetch documents" });
  }
};

/* ------------------- GET SINGLE DOCUMENT ------------------- */
exports.getLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Library.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    return res.status(200).json({ file: doc });
  } catch (error) {
    console.error("Get Library Error:", error);
    return res.status(500).json({ message: "Failed to fetch document" });
  }
};




/* ------------------- UPDATE DOCUMENT ------------------- */
exports.updateLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const doc = await Library.findById(id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    doc.title = title || doc.title;

    if (req.file) {
      doc.file = {
        url: req.file.path,
        format: req.file.mimetype.split("/")[1],
        size: req.file.size,
        public_id: req.file.filename,
        original_name: req.file.original_name,
      };
    }

    await doc.save();

    return res.status(200).json({ file: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Update failed" });
  }
};



/* ------------------- DELETE DOCUMENT ------------------- */

exports.deleteLibrary = async (req, res) => {
  try {
    const doc = await Library.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });

    await cloudinary.uploader.destroy(doc.file.public_id, {
      resource_type: "raw",
    });

    await doc.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};




  