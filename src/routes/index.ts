import express, { Request, Response } from "express";
import path from "path";
// import { PositionModel } from "../models/position";
// import { ChessModel } from "../models/chess";
// import { InvitationModel } from "../models/invitations";
// import { UserModel } from "../models/user";
const router = express.Router();

// router.get("/", async (_, res) => {
//   // For clean up purpose
//   // await UserModel.deleteMany({});
//   // await ChessModel.deleteMany({});
//   // await InvitationModel.deleteMany({});
//   // await PositionModel.deleteMany({});
//   res.send("Mission Successful");
// });
// router.get("*", (_req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });
export default router;
