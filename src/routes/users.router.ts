import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import { ensureNicknameIsUnicMiddleware } from "../middlewares/ensureNicknameIsUnic.middleware";
import ensurePayloadIsVaildMiddleware from "../middlewares/ensurePayloadIsVaild.middleware";
import { ensurePhoneIsUnicMiddleware } from "../middlewares/ensurePhoneIsUnic.middlewares";
import { ensureUserEmailIsUnicMiddleware } from "../middlewares/ensureUserEmailIsUnic.middleware";
import { ensureUserIdExistsMiddleware } from "../middlewares/ensureUserIdExists.middleware";
import { userSchemaRegister, userSchemaUpdate } from "../schemas/user.schemas";

const userRouter: Router = Router();

userRouter.get('/:id',ensureUserIdExistsMiddleware);
userRouter.post('/',ensurePayloadIsVaildMiddleware.body(userSchemaRegister),ensureUserEmailIsUnicMiddleware,ensureNicknameIsUnicMiddleware,ensurePhoneIsUnicMiddleware,createUserController);
userRouter.patch('/',ensurePayloadIsVaildMiddleware.body(userSchemaUpdate),ensureUserEmailIsUnicMiddleware,ensureNicknameIsUnicMiddleware,ensurePhoneIsUnicMiddleware,createUserController);


export default userRouter;