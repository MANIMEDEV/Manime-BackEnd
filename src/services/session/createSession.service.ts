import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user";
import AppError from "../../errors";
import { IuserLogin } from "../../interfaces/users.interfaces";

export const createSessionService = async (payload:IuserLogin) => {
    const { login, password } = payload;

    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const user = await userRepo.createQueryBuilder().where("email = :loginUser OR nickname = :loginUser", { loginUser: login }).getOne();

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const passwordMatch = await compare(password, user.password)
    

    if (!passwordMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    if (user?.deletedAt) {
        throw new AppError("Invalid credentials", 401);
    }


    const token = sign({
        admin: user.admin,
        id: user.id
    },
        String(process.env.SECRET_KEY),
        {
            subject: String(user.id)
        }
    );

    return token;
}