const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const commentsToModerate = {};

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "COMMENT_CREATED":
      const status = data.content.includes("organge") ? "rejected" : "approved";

      await axios.post("http://localhost:4005/events", {
        type: "COMMENT_MODERATED",
        data: {
          id: data.id,
          postId: data.postId,
          status: status,
        },
      });
  }

  res.sendStatus(200);
});

app.listen(4003, () => console.log("Running on port 4003"));
