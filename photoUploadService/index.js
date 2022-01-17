const express = require('express');
const app = express();

const photoRoute = require('./src/routes/photo')
app.use(express.json());


app.listen(5000, () => {
  console.log('App listening to port 5000');
});


app.use("/", photoRoute)



