import express from "express";
import userRouter from "./routes/users.router";
import { errorHandler } from "./middlewares/handleError.middleware";
import "express-async-errors";
import loginRouter from "./routes/login.router";
import cors from 'cors'
import chatRouter from "./routes/chat.router";


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use("/login", loginRouter);

app.use(errorHandler);



export default app