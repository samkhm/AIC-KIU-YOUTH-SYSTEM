const Payment = require("../models/payments")
const User = require("../models/User")
const axios = require("axios")
const mongoose = require("mongoose")


exports.createContributions = async (req, res) => {
  try {
    let { userId, projectId, project_name, amount } = req.body;
        
    // Normalize userId if nested
    if (typeof userId === "object" && userId?.userId) {
      userId = userId.userId;
    }

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid projectId" });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   

    // Validate phone
    let phone = user.phone;
    if (!phone) {
      return res.status(400).json({ error: "User phone missing" });
    }

    phone = phone.replace(/\s+/g, ""); // remove spaces

    // Handle local formats
    if (phone.startsWith("+254")) {
      phone = phone.substring(1); // +254712345678 → 254712345678
    } else if (phone.startsWith("0")) {
      // 07xxxxxxx or 01xxxxxxx → 254xxxxxxx
      phone = "254" + phone.substring(1);
    } else if (phone.startsWith("7") && phone.length === 9) {
      phone = "254" + phone;
    }

    // Validate amount
    amount = Number(amount);
    if (isNaN(amount) || amount < 1) {
      return res.status(400).json({ error: "Amount must be at least 1 KES" });
    }

    // Validate MPesa token
    if (!req.token) {
      return res.status(401).json({ error: "Missing MPesa access token" });
    }

    // Generate timestamp
    const date = new Date();
    const timestamp =
      date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0") +
      String(date.getHours()).padStart(2, "0") +
      String(date.getMinutes()).padStart(2, "0") +
      String(date.getSeconds()).padStart(2, "0");

    const shortcode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;

    const password = Buffer.from(
      shortcode + passkey + timestamp
    ).toString("base64");

    // STK Push payload
    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: `${project_name} contribution`,
      TransactionDesc: `Payment for ${project_name}`,
    };


    // Send STK push
    const { data } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPayload,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
        timeout: 10000,
      }
    );

    if (data.ResponseCode !== "0") {
      return res.status(400).json({
        status: "rejected",
        message: data.ResponseDescription || "Payment request rejected",
      });
    }

    // Save pending payment
    const payment = await Payment.create({
      userId,
      projectId,
      project_name,
      amount,
      phone,
      checkoutRequestID: data.CheckoutRequestID,
      merchantRequestID: data.MerchantRequestID,
      status: "pending",
    });

    return res.status(200).json({
      status: "initiated",
      message: data.CustomerMessage,
      checkoutRequestID: data.CheckoutRequestID,
      payment,
    });

  } catch (err) {
    if (err.code === "ECONNABORTED") {
      return res.status(504).json({
        status: "timeout",
        message: "STK push request timed out",
      });
    }

    const safError = err.response?.data || {};
    const message =
      safError.errorMessage ||
      safError.ResponseDescription ||
      err.message ||
      "Unknown error during STK push";

    return res.status(500).json({ status: "failed", message });
  }
};

exports.callBack = async (req, res) => {
  const callback = req.body?.Body?.stkCallback;
  if (!callback) {
    return res.status(200).json({ message: "Callback received (no data)" });
  }

  const checkoutRequestID = callback.CheckoutRequestID;

  const payment = await Payment.findOne({
    checkoutRequestID: callback.CheckoutRequestID
  });
  
  if (!payment) {
    return res.status(200).json({ message: "No matching payment" });
  }

  // Handle failed transactions
  if (callback.ResultCode !== 0) {

    await Payment.findOneAndUpdate(
      { checkoutRequestID },
      { status: "failed" }
    );

    return res.status(200).json({ message: "Payment failed" });
  }

  const items = callback.CallbackMetadata?.Item || [];

  const amount = items.find(i => i.Name === "Amount")?.Value;
  const transaction_id = items.find(i => i.Name === "MpesaReceiptNumber")?.Value;
  const transaction_date = items.find(i => i.Name === "TransactionDate")?.Value;
  const phoneNumber = items.find(i => i.Name === "PhoneNumber")?.Value;

  if (!amount || !transaction_id || !transaction_date || !phoneNumber) {
    return res.status(200).json({ message: "Incomplete callback data" });
  }

  const parsedDate = new Date(
    transaction_date
      .toString()
      .replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
        "$1-$2-$3T$4:$5:$6Z"
      )
  );

  try {
    // Prevent duplicates
    const existing = await Payment.findOne({ transaction_id });
    if (existing) {
      return res.status(200).json({ message: "Duplicate transaction" });
    }

    const payment = await Payment.findOne({ checkoutRequestID });
    if (!payment) {
      return res.status(200).json({ message: "No matching payment" });
    }

    payment.status = "completed";
    payment.transaction_id = transaction_id;
    payment.transaction_date = parsedDate;
    payment.amount_paid = amount;

    await payment.save();

    return res.status(200).json({ message: "Payment completed" });

  } catch (err) {
    return res.status(500).json({ message: "Database error" });
  }
};

// GET /payments/:checkoutRequestID
exports.getPaymentStatus = async (req, res) => {
  const { checkoutRequestID } = req.params;

  const payment = await Payment.findOne({ checkoutRequestID });

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  return res.status(200).json({
    status: payment.status, // pending | completed | failed
    payment
  });
};



exports.getContributions = async (req, res) => {

    const userId = req.params.userId;

    try {

        const contributions = await Payment.find({ userId }).sort({ createdAt: -1});
        if (!contributions || contributions.length === 0) {
            return res.json({ message: "No contributions you have made" })
        }

        return res.json({ contributions })

    } catch (error) {
        return res.status(500).json({ message: "Server failure!" })

    }
}

exports.getPayments = async (req, res) =>{
  try {

    const payments = await Payment.find()
    if (!payments || payments.length === 0) {
      return res.json({ message: "No contributions you have made" })
  }

  return res.json({ payments })
    
  } catch (error) {
    return res.status(500).json({ message : "Server failure"})
    
  }
}