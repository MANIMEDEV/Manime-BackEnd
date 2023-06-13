import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Chat } from './chat';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderId: number;

    @Column({type: 'text'})
    content: string;

    @CreateDateColumn({ type: 'date' })
    sent_at : string

    @Column()
    timestamp: Date;

    @DeleteDateColumn({ type: 'date' })
    deletedAt: string

    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;

}

