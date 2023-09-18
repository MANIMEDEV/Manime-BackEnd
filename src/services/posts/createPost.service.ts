import { Repository } from "typeorm";
import { IpostRegister } from "../../interfaces/post.interfaces";
import { AppDataSource } from "../../data-source";
import Posts from "../../entities/posts";
import User from "../../entities/user";
import AppError from "../../errors";
import Likes from "../../entities/likes";
import { postsSchemaResponse } from "../../schemas/post.schemas";

export const createPostService = async (post: IpostRegister, userId: number, imgs: string[]) => {
    const postRepo: Repository<Posts> = AppDataSource.getRepository(Posts);
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const newPost = new Posts();

    const user = await userRepo.findOneBy({ id: Number(userId) });
    if (!user) {
        throw new AppError('user');
    }

    newPost.user = user;
    newPost.imgs = JSON.stringify(imgs) || null;
    newPost.numLikes = 0;
    newPost.numberShares = 0;
    newPost.description = post.description;

    await postRepo.save(newPost);

    return newPost;
}

export const getAllPostsService = async () => {
    const postRepo: Repository<Posts> = AppDataSource.getRepository(Posts);

    const posts = await postRepo.createQueryBuilder("post").innerJoinAndSelect("post.user", "user").leftJoinAndSelect("post.likes", "likes").leftJoinAndSelect("likes.user", "likesUser").orderBy("post.createdAt","DESC").addOrderBy("post.numLikes","DESC").getMany();

    const respPosts = posts.map(post => {
        post.imgs = JSON.parse(post.imgs!) || [];

        if(post.imgs == null){
            post.imgs = "";
        }
        return post
    })

    console.log(respPosts);
    const resp = await postsSchemaResponse.parse(respPosts);

    return resp;
}
export const likePostService = async (postId: number, userId: number) => {
    const postRepo: Repository<Posts> = AppDataSource.getRepository(Posts);
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const likeRepo: Repository<Likes> = AppDataSource.getRepository(Likes);
    const post = await postRepo.findOneBy({ id: postId });
    const user = await userRepo.findOneBy({ id: Number(userId) });
    if (!user) {
        throw new AppError('user');
    }

    if (!post) {
        throw new AppError('Post not found', 404);
    }
    const verifyLike = await likeRepo.createQueryBuilder("likes").where("likes.postId = :idPost", { idPost: post.id }).andWhere("likes.userId = :idUser", { idUser: user.id }).getOne();

    if (!verifyLike) {
        const newLike = new Likes();

        newLike.user = user;
        newLike.post = post;

        await likeRepo.save(newLike);
        if (!post.likes) {
            post.likes = []
        }
        post.likes.push(newLike);
        post.numLikes += 1;
        await postRepo.save(post);
    } else {
        likeRepo.remove(verifyLike);
        if (post.likes) {
            const attLikes = post.likes.filter(like => like != verifyLike);
            post.likes = attLikes;
        } else {
            post.likes = []
        }
        post.numLikes -= 1;
        await postRepo.save(post);
    }
}