const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const route = require("./routes");
const db = require("./config/db");

const app = express();
const port = 8000;

// Mongodb connection
db.connect();

app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

// HTTP logger
app.use(morgan("combined"));

// Routes init
// Instead of inserting routes here, put them in /routes/index.js.
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
