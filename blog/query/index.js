const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", async (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "POST_CREATED":
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    case "COMMENT_CREATED":
      const { commentId, content, postId, status } = data;
      const post = posts[postId];
      post.comments.push({ commentId, content, status });
      posts[postId] = post;
      break;
  }

  res.sendStatus(200);
});

app.listen(4002, () => console.log("Running on port 4002"));
