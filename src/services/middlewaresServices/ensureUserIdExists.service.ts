import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user";

export const ensureUserIdExistsService = async (userId: number): Promise<boolean> => {

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const IdExists = await userRepo.exist({ where: { id: userId } });
    
    return IdExists;
}