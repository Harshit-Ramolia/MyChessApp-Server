import express from "express";
import routes from "./routes";
import "./config/mongoose";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server connected at port : ${PORT}`);
});
