const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", async (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.sendStatus(200);
});

app.listen(4002, async () => {
  console.log("Running on port 4002");

  const res = await axios.get("http://event-bus-srv:4005/events");
  res.data.forEach((event) => handleEvent(event.type, event.data));
  console.log(`Processed ${res.data.length} old events`);
});

function handleEvent(type, data) {
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
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id == id);
    comment.content = content;
    comment.status = status;
  }
}
