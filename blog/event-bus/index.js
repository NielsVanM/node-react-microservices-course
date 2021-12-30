const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const eventHistory = [];

const app = express();
app.use(bodyParser.json());

app.get("/events", (req, res) => {
  res.send(eventHistory);
});

app.post("/events", (req, res) => {
  const event = req.body;

  eventHistory.push(event);

  axios
    .post("http://localhost:4000/events", event)
    .catch((error) => console.log(error));
  axios
    .post("http://localhost:4001/events", event)
    .catch((error) => console.log(error));
  axios
    .post("http://localhost:4002/events", event)
    .catch((error) => console.log(error));
  axios
    .post("http://localhost:4003/events", event)
    .catch((error) => console.log(error));

  res.send({ status: "ok" });
});

app.listen(4005, () => console.log("Running on port 4005"));
