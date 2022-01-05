const express = require('express');
const app = express();
const mailRoute = require('./src/Routes/v1/mail')
const dotenv = require('dotenv');

app.use(express.json());
dotenv.config();


app.get("/ping", (req, res) => {
    res.send("heloo i am mailer")
})
app.use("/sendMail",mailRoute)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Backend server is ready...")
})