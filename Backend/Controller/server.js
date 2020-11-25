const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const PORT = 5000
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const userRoute = require('../View/users.js');

app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
});

app.use("/users", userRoute)



app.listen(PORT, () => {
    console.log(`Se min server på port: http://localhost:${PORT}`);
});