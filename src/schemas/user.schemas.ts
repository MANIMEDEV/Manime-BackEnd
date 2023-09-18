import { z } from "zod";
import { profileInfosSchema } from "./profileInfos.schemas";

const userSchema = z.object({
    id: z.number(),
    fullName: z.string().max(60),
    nickname: z.string().max(20),
    email: z.string().email(),
    password: z.string().max(120),
    phone: z.string().max(20).nullable(),
    profileImg: z.string().default(''),
    bannerImg: z.string().default(''),
    banned: z.boolean().default(false),
    suspended: z.boolean().default(false),
    suspendedTime: z.string().nullish(),
    admin: z.boolean().default(false),
    verified: z.boolean().default(false),
    confirmed: z.boolean().default(false),
    profileInfos: profileInfosSchema,
    createdAt: z.string(),
    updatedAt: z.string().nullish(),
    deletedAt: z.string().nullish()
});

const userSchemaRegister = userSchema.omit({
    updatedAt: true,
    deletedAt: true,
    createdAt: true,
    profileInfos: true,
    confirmed: true,
    verified: true,
    suspendedTime: true,
    suspended: true,
    banned: true,
    id: true
})

const userSchemaUpdate = userSchemaRegister;


const userSchemaResponse = userSchema.omit({
    password: true,
})


const userSchemaResponseLogin = userSchema.omit({
    profileInfos: true,
    password: true,
})

const userLoginSchema = z.object({
    login: z.string(),
    password: z.string()
});

const userBaseResponse = z.object({
    id: z.number(),
    fullName: z.string().max(60),
    nickname: z.string().max(20),
    phone: z.string().max(20).optional().nullable(),
    profileImg: z.string().default(''),
    bannerImg: z.string().default(''),
    banned: z.boolean().default(false).optional(),
    verified: z.boolean().default(false).optional()
})

export {
    userSchema,
    userSchemaRegister,
    userSchemaResponse,
    userSchemaUpdate,
    userLoginSchema,
    userSchemaResponseLogin,
    userBaseResponse
}