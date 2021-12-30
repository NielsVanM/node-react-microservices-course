const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postList = JSON.parse(fs.readFileSync("data.json"));

app.get("/posts", (req, res) => {
  res.send(postList);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  postList[id] = { id, title };

  res.status(201).send(postList[id]);
});

app.listen(4000, () => console.log("Listening on 4000"));
