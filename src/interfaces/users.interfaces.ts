import { DeepPartial } from "typeorm";
import { z } from "zod";
import { userSchema, userSchemaRegister, userSchemaResponse, userSchemaUpdate } from "../schemas/user.schemas";

export type TUserRegister = z.infer<typeof userSchemaRegister>
export type TUser = z.infer<typeof userSchema>
export type TUserResponse = z.infer<typeof userSchemaResponse>
export interface IuserLogin{
    login:string,
    password: string
}

export interface IBaseUser {
    id: number | string,
    nickname: string;
    profileImg: string;
}



export type TUserUpdate = DeepPartial<z.infer<typeof userSchemaUpdate>>