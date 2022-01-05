const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const usersRoute = require('./src/routes/users');
const authRoute = require('./src/routes/auth')

dotenv.config();
//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.get("/ping", (req, res) => {
    res.send("HOHO Welcome to Socially  !!")
})


app.use("/auth", authRoute)
app.use("/users", usersRoute)

app.use((err, req, res, next) => {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Backend server is ready...")
})


mongoose.connect(process.env.MONGO_URL, (err) => {
    if (!err) {
        console.log("successfully connected to mongoDB")
    }
    else {
        console.log("Coudn't connect to mongoDB")
        console.log(err)
    }
});

