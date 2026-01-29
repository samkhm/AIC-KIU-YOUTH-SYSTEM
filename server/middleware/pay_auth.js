const axios = require("axios")

exports.generateToken = async (req, res, next) => {
    const secret = process.env.MPESA_CONSUMER_SECRET;
    const consumerKey = process.env.MPESA_CONSUMER_KEY;

    const auth = Buffer.from(`${consumerKey}:${secret}`).toString("base64");

    try {
        const { data } = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    authorization: `Basic ${auth}`,
                },
            }
        );

        req.token = data.access_token;
        
        next();
    } catch (err) {
        res.status(400).json({ error: "Token generation failed", details: err.message });

    }
};