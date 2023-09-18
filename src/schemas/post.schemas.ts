import { z } from "zod";
import { userBaseResponse } from "./user.schemas";


const likeList = z.array(z.object({user: userBaseResponse}));

const postSchemaResponse = z.object({
    id: z.number(),
    user: userBaseResponse,
    numComments: z.number(),
    numLikes: z.number(),
    imgs: z.string().or(z.array(z.string())).nullable(),
    description: z.string().nullable(),
    likes: likeList,
});

const postsSchemaResponse = z.array(postSchemaResponse);
export {
    likeList,
    postSchemaResponse,
    postsSchemaResponse,
}