const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "COMMENT_CREATED":
      const status = data.content.includes("orange") ? "rejected" : "approved";

      setTimeout(
        async () =>
          await axios.post("http://event-bus-srv:4005/events", {
            type: "COMMENT_MODERATED",
            data: {
              id: data.id,
              postId: data.postId,
              status: status,
            },
          }),
        10000
      );
  }

  res.sendStatus(200);
});

app.listen(4003, () => console.log("Running on port 4003"));
