import express from "express";

const router = express.Router();

router.get("/api/users/signin", (req, res) => res.send("hi"));

export { router as signinRouter };
