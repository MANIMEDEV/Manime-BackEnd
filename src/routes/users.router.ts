import { Router } from "express";
import {
    createFollowUser, createUserController,
    getAllUsersController,
    getUserListFollowingController,
    getUserListMutualFollowersController,
    getUserProfileInfosController
} from "../controllers/users.controllers";
import { ensureNicknameIsUnicMiddleware } from "../middlewares/ensureNicknameIsUnic.middleware";
import ensurePayloadIsVaildMiddleware from "../middlewares/ensurePayloadIsVaild.middleware";
import { ensurePhoneIsUnicMiddleware } from "../middlewares/ensurePhoneIsUnic.middlewares";
import { ensureUserEmailIsUnicMiddleware } from "../middlewares/ensureUserEmailIsUnic.middleware";
import { ensureUserIdExistsMiddleware } from "../middlewares/ensureUserIdExists.middleware";
import { userSchemaRegister, userSchemaUpdate } from "../schemas/user.schemas";
import { retrivieveUserController } from "../controllers/session.controllers";

const userRouter: Router = Router();

userRouter.get('/:id', retrivieveUserController, ensureUserIdExistsMiddleware);
userRouter.get('/profile/infos', retrivieveUserController, getUserProfileInfosController);
userRouter.get('/list/friends', retrivieveUserController, getUserListMutualFollowersController);
userRouter.get('/list/followers', retrivieveUserController, getUserListFollowingController);
userRouter.get('/list/followings', retrivieveUserController, getUserListMutualFollowersController);
userRouter.post('/follow/:followId', retrivieveUserController, createFollowUser);
userRouter.get('/list/all', retrivieveUserController, getAllUsersController);
userRouter.post('/', ensurePayloadIsVaildMiddleware.body(userSchemaRegister), ensureUserEmailIsUnicMiddleware, ensureNicknameIsUnicMiddleware, ensurePhoneIsUnicMiddleware, createUserController);
userRouter.patch('/', retrivieveUserController, ensurePayloadIsVaildMiddleware.body(userSchemaUpdate), ensureUserEmailIsUnicMiddleware, ensureNicknameIsUnicMiddleware, ensurePhoneIsUnicMiddleware, createUserController);


export default userRouter;