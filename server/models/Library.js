const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    file: {
      url: { type: String, required: true },
      format: { type: String, required: true },
      size: { type: Number, required: true },
      public_id: { type: String, required: true },
      original_name: { type: String, required: true }, // added
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Library", LibrarySchema);
