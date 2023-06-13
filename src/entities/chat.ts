import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToMany, JoinTable } from 'typeorm';
import { Message } from './messages';
import User from './user';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomId: string;

    @OneToMany(() => Message, (message) => message.chat, { cascade: true })
    messages: Message[];

    @ManyToMany(() => User, user => user.chats)
    @JoinTable()
    users: User[];
}
