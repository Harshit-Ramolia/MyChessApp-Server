import express from "express";
import routes from "./routes";
import "./config/mongoose";
import cors from "cors";
import session from "express-session";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server connected at port : ${PORT}`);
});
