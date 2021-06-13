import express from "express";
import { UserModel } from "../models/user";
const router = express.Router();

router.get("/", async (_, res) => {
  // await UserModel.deleteMany({}).exec();
  // res.send("A")
  UserModel.create({ username: "aB" })
    .then(async () => {
      let document = await UserModel.find({}).exec();
      res.send(document);
    })
    .catch((Error: Error) => {
      res.send(Error);
    });
});

export default router;
