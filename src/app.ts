import express from "express";
import userRouter from "./routes/users.router";
import { errorHandler } from "./middlewares/handleError.middleware";
import "express-async-errors";
import loginRouter from "./routes/login.router";
import cors from 'cors'
import chatRouter from "./routes/chat.router";
import "dotenv/config";
import postsRouter from "./routes/posts.router";
import path from 'path';

const app = express();

const publicFolderPath = path.join(__dirname, "../public");
app.use(express.static(publicFolderPath));

const orginUrl: string | undefined = process.env.Origin_URL;
app.use(express.json());

app.use(cors({
    origin: orginUrl,
    credentials: true
}));

app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);

app.use(errorHandler);



export default app