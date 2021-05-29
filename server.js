const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
    fs.readFile("index.html", (err, data) => {
        if (err) throw err;

        res.writeHead(200, { "Content-Type" : "text/html" });

        res.write(data)

        res.end();
    });
  });
  app.get("/TODO", (req, res) => {
    fs.readFile("data.html", (err, data) => {
        if (err) throw err;

        res.writeHead(200, { "Content-Type" : "text/html" });

        res.write(data)

        res.end();
    });
  });
require('./app/routes/todo.routes')(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});