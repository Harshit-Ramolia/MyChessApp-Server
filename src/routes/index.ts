import express from "express";
import { UserModel } from "../models/user";
const router = express.Router();


router.get("/", async (_, res) => {
  let document = await UserModel.find({}).exec();
  res.send(document);
});

export default router;
