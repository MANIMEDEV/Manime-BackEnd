import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm'
import User from './user';
import Posts from './posts';

@Entity('likes')
class Likes {
    @PrimaryGeneratedColumn('increment')
    id: number

    @JoinColumn()
    @ManyToOne(()=> User, user => user.id)
    user: User

    @JoinColumn()
    @ManyToOne(()=> Posts, posts => posts.likes, {nullable: false})
    post: Posts

    @CreateDateColumn({ type: 'date' })
    createdAt: string

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string

    @DeleteDateColumn({ type: 'date' })
    deletedAt: string
}

export default Likes;