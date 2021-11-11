const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", usersRoute);

var port = process.env.port || 8877;
app.listen(port);
console.log("listen to port : " + port);
