const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    project_name: {
      type: String,
      required: true
    },
    phone: String,
    amount: {
      type: Number,
      required: true
    },
    transaction_id: {
      type: String,
      unique: true,
      sparse: true
    },
    transaction_date: Date,
    checkoutRequestID: {
      type: String,
      unique: true,
      required: true
    },
    merchantRequestID: String,
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
