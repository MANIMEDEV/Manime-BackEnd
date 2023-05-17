import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";
import ensurePayloadIsVaildMiddleware from "../middlewares/ensurePayloadIsVaild.middleware";
import { userLoginSchema } from "../schemas/user.schemas";

const loginRouter: Router = Router();

loginRouter.post('/',ensurePayloadIsVaildMiddleware.body(userLoginSchema),createSessionController);


export default loginRouter;