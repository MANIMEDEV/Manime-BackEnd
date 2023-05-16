import "express-async-errors";
import express from "express";
import userRouter from "./routes/user.router";
import { errorHandler } from "./middlewares/handleError.middleware";
const app = express();
app.use(express.json());

app.use("/users",userRouter);

app.use(errorHandler);



export default app