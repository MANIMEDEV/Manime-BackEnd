import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import User from '../../entities/user';


export async function followUser(userId: number, targetUserId: number): Promise<void> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id:userId});
    const targetUser = await userRepository.findOneBy({id:targetUserId});

    if (user && targetUser) {
        user.follow(targetUser);
        await userRepository.save([user]);
    }
}

export async function unfollowUser(userId: number, targetUserId: number): Promise<void> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id:userId});
    const targetUser = await userRepository.findOneBy({id:targetUserId});

    if (user && targetUser) {
        user.unfollow(targetUser);
        await userRepository.save([user]);
    }
}