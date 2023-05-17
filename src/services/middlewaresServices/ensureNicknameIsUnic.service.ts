import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user";

export const ensureNicknameIsUnic = async (userNickname: string): Promise<Boolean> => {

    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const exists = await userRepo.exist({ where: { nickname: userNickname } });

    return !exists;
}