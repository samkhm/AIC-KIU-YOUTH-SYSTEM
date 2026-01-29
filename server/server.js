require('dotenv').config();
const express = require('express')
const cors = require("cors")
const connectDB = require("./config/db")


const app = express();
connectDB();

app.use(express.json());
app.use(cors())

app.use('/api/auth', require("./routes/onBoardingRoutes"));
app.use('/api/tasks', require('./routes/operationsRoutes'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})