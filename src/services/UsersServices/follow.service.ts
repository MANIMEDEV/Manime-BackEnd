import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import User from '../../entities/user';
import { IBaseUser } from '../../interfaces/users.interfaces';
import ProfileInfos from '../../entities/profileInfos';

export async function followUser(userId: number, targetUserId: number): Promise<void> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const profileRepository: Repository<ProfileInfos> = AppDataSource.getRepository(ProfileInfos);

    
    const user = await userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.following', 'following')
    .where('user.id = :userId', { userId: userId })
    .getOne();
    
    const userProfile = await profileRepository.createQueryBuilder('profile')
    .where('profile.userId = :userId', {userId: userId})
    .getOne()

    const targetProfile = await profileRepository.createQueryBuilder('profile')
    .where('profile.userId = :userId', {userId: targetUserId})
    .getOne()

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


        userProfile!.numberFollowing = user.following.length;
        targetProfile!.numberFollowers = targetUser.followers.length;

        await profileRepository.save(userProfile!);
        await profileRepository.save(targetProfile!);
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
        targetUser.profileInfos.numberFollowers - 1;
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
export async function getAllUsersService(filter: string): Promise<IBaseUser[]> {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    
    const users = await userRepository.createQueryBuilder('user')
    .innerJoinAndSelect('user.profileInfos', 'infos')
    .where("LOWER(user.nickname) LIKE LOWER(:like)", {like: filter+"%"})
    .getMany();

    const returnUsers: IBaseUser[] = users.map(user => {
        return {
            id: user.id,
            nickname: user.nickname,
            profileImg: user.profileImg,
            profileInfos: {
                description: user.profileInfos.description,
                numberFollowers: user.profileInfos.numberFollowers,
                numberFollowing: user.profileInfos.numberFollowing,
                numberPosts: user.profileInfos.numberPosts,
            }
        }
    })

    return returnUsers;


}