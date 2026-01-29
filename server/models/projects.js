const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    image: String,
    imagePublicId: String,
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Project", projectSchema)
