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

        console.log(user);
        
        if (user) {
            res.json(user.chats);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user chats' });
    }
}
