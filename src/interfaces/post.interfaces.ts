import { IBaseUser } from "./users.interfaces";

export interface Ipost {
    id: number | null;
    user:IBaseUser;
    numlikes: number;
    numComments: number;
    imgs: string[] | null;
    description: string | null;
}

export interface IpostRegister {
    numlikes: number;
    numComments: number;
    imgs: string[] | null;
    description: string | null;
}