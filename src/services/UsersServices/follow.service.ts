import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import User from '../../entities/user';
import { IBaseUser } from '../../interfaces/users.interfaces';


export async function followUser(userId: number, targetUserId: number): Promise<void> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.following', 'following')
        .where('user.id = :userId', { userId: userId })
        .getOne();


    const targetUser = await userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.followers', 'followers')
        .where('user.id = :userId', { userId: targetUserId })
        .getOne();

    if (user && targetUser) {

        if (!user.following) {
            user.following = [];
        }

        if (!targetUser.followers) {
            targetUser.followers = [];
        }
        user.following.push(targetUser);
        targetUser.followers.push(user);

        await userRepository.save(user);
        await userRepository.save(targetUser);
    }
}

export async function unfollowUser(userId: number, targetUserId: number): Promise<void> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    const targetUser = await userRepository.findOneBy({ id: targetUserId });

    if (user && targetUser) {
        user.unfollow(targetUser);
        targetUser.unfollow(user);

        await userRepository.save([user, targetUser]);
    }
}


export async function getMutualFollowers(userId1: number): Promise<IBaseUser[]> {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const query = userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.followers', 'followers')
        .innerJoin('user.following', 'following', 'following.id = :userId')
        .where('followers.id = :userId', { userId: userId1 });
    const users = await query.getMany();

    const returnUsers: IBaseUser[] = users.map(user => {
        return {
            id: user.id,
            nickname: user.nickname,
            profileImg: user.profileImg,
        }
    })

    return returnUsers;


}