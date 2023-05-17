import express from "express";
import userRouter from "./routes/users.router";
import { errorHandler } from "./middlewares/handleError.middleware";
import "express-async-errors";
import loginRouter from "./routes/login.router";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(errorHandler);



export default app