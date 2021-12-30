const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentStore = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentStore[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentStore[req.params.id] || [];
  comments.push({ id, content });
  commentStore[req.params.id] = comments;

  axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: {
      id,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post("/event", (req, res) => res.sendStatus(200));

app.listen(4001, () => console.log("Listening on 4001"));
