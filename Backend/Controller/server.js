const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const routes = require('../Routes/routes.js');

app.use("/users", routes)

var server = app.listen(PORT, () => {
    console.log(`Server running at port: http://localhost:${PORT}`);
});

module.exports = server;