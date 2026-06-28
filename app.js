const express = require("express");
const app = express();
const pool = require("./model/dbconnection");

app.listen(3000, () => {
  console.log("App is listening at http://localhost:3000");
});
