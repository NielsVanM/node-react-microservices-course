const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

postList = {};

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  postList[id] = { id, title };

  res.status(201).send(postList[id]);

  await axios.post("http://event-bus-srv:4005/events", {
    type: "POST_CREATED",
    data: postList[id],
  });
});

app.post("/events", (req, res) => res.sendStatus(200));

app.listen(4000, () => console.log("Listening on 4000"));
