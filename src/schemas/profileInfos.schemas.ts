import { z } from "zod";
import { userSchemaResponse } from "./user.schemas";

export const profileInfosSchema = z.object({
    id: z.number(),
    description: z.string().nullable(),
    numberFollowers: z.number(),
    numberFollowing: z.number(),
    numberPosts: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable()
});
export const profileInfosWithUserSchema = z.object({
    id: z.number(),
    description: z.string().nullable(),
    numberFollowers: z.number(),
    numberFollowing: z.number(),
    numberPosts: z.number(),
    createdAt: z.string(),
    user: userSchemaResponse,
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable()
});