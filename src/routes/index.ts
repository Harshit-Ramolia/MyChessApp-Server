import express from "express";
// import { PositionModel } from "../models/position";
// import { ChessModel } from "../models/chess";
// import { InvitationModel } from "../models/invitations";
// import { UserModel } from "../models/user";
const router = express.Router();

router.get("/", async (_, res) => {
  // For clean up purpose
  // await UserModel.deleteMany({});
  // await ChessModel.deleteMany({});
  // await InvitationModel.deleteMany({});
  // await PositionModel.deleteMany({});
  res.send("Mission Successful");
});

export default router;
