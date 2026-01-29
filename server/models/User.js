const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: {type: String, required: true},
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "moderator"], default: "user" },
    disabled: { type: Boolean, default: false},
    status: { type: Boolean, default: true},
    count: {type: Number, default: 0},
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);