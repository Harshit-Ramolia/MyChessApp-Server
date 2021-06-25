import express from "express";
import { ChessModel } from "../models/chess";
import { InvitationModel } from "../models/invitations";
import { UserModel } from "../models/user";
const router = express.Router();

router.get("/", async (_, res) => {
  await UserModel.deleteMany({});
  await ChessModel.deleteMany({});
  await InvitationModel.deleteMany({});
  res.send("Mission Successful");
});

export default router;
