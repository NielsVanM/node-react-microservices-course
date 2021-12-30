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

  if (type === "POST_CREATED") {
    let { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "COMMENT_CREATED") {
    let { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
    posts[postId] = post;
  }

  if (type === "COMMENT_UPDATED") {
    let { id, content, postId, status } = data;
    console.log(data);
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id == id);
    comment.content = content;
    comment.status = status;
  }

  res.sendStatus(200);
});

app.listen(4002, () => console.log("Running on port 4002"));
