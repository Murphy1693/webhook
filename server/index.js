require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middleware.js");

const app = express();
app.use(cors());
app.use(logger);

app.use(express.json());

app.use(express.static("./public"));

app.listen(process.env.PORT, () => {
  console.log(`listening on port: ${process.env.PORT}`);
});
