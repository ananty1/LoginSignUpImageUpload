// app.route
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js"
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.use(express.static("public"))


app.use("/", routes);


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });