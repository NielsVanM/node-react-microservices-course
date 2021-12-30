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
  comments.push({ id, content, status: "pending" });
  commentStore[req.params.id] = comments;

  axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: {
      id,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "COMMENT_MODERATED":
      const { postId, id, status } = data;

      const comments = commentStore[postId];
      const comment = comments.find((comment) => comment.id === id);
      comment.status = status;

      await axios.post("http://localhost:4005/events", {
        type: "COMMENT_UPDATED",
        data: {
          id,
          postId,
          status,
          content: comment.content,
        },
      });

      break;
  }

  res.sendStatus(200);
});

app.listen(4001, () => console.log("Listening on 4001"));
