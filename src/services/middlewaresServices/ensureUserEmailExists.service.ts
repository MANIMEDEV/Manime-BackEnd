import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user";

export const ensureUserEmailExistsService = async (userEmail: string): Promise<boolean> => {

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const emailExists = await userRepo.exist({ where: { email: userEmail } });
    
    return emailExists;
}