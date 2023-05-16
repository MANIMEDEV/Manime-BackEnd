
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    Column,
    DeleteDateColumn,
    JoinColumn,
} from 'typeorm'
import Posts from './posts';
import User from './user';

@Entity('comments')
class Comments {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar',length: 255})
    description: string

    @JoinColumn()
    @OneToOne(()=> User, user => user.id)
    user: User
    
    @JoinColumn()
    @OneToOne(()=> Posts, posts => posts.id)
    post: Posts

    @CreateDateColumn({ type: 'date' })
    createdAt: string

    @DeleteDateColumn({type: 'date'})
    deletedAt: string
}

export default Comments;