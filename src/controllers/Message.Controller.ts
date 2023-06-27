import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import User from '../entities/user';

export async function getChats(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
        const user = await AppDataSource.getRepository(User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.chats', 'chat')
            .where('user.id = :id', { id: userId })
            .getOne();

        const resp = await Promise.all( user!.chats.map(async (chat) => {
            const ids = chat.roomId.split('_');
            const getUserBaseInfo = await AppDataSource.getRepository(User)
                .findOneBy({ id: ids[0] == userId ? Number(ids[1]) : Number(ids[0]) });

            const newChat = {
                ...chat, userInfos: {
                    name: getUserBaseInfo!.nickname,
                    profileImg: getUserBaseInfo!.profileImg
                }
            };


            return newChat;
        })); 

    
        
        if (user) {
            res.json(resp);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user chats' });
    }
}
