import express from "express";
import { json } from "body-parser";
import { errorHandler } from "./middleware/error-handler";
import {
  currentUserRouter,
  signupRouter,
  signinRouter,
  signoutRouter,
} from "./routes";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(errorHandler);

app.listen(3000, () => console.log("Started service on port 3000"));
