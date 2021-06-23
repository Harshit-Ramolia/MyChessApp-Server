import express from "express";
import { UserModel } from "../models/user";
const router = express.Router();

router.get("/", async (_, res) => {
  res.send("Mission Successful");
});

export default router;
