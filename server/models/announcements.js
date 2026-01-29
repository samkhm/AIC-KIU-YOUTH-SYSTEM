const mongoose = require("mongoose")

const announcementSchema = new mongoose.Schema({
    data: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model("Announcement", announcementSchema);