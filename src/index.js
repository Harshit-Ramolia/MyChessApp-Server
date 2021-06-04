import express from "express";
import routes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(routes)

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
