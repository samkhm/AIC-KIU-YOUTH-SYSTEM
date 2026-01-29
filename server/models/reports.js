const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model("Report", reportSchema);
