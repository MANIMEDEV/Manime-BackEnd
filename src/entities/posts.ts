
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import User from './user';
import Likes from './likes';

@Entity('posts')
class Posts {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type:'integer', default: 0})
    numberShares: number

    @Column({type: 'text', nullable: true})
    description: string | null

    @Column({type: 'text', nullable: true})
    imgs: string | null

    @Column({type:'integer', default: 0})
    numLikes: number

    @Column({type:'integer', default: 0})
    numComments: number

    @JoinColumn()
    @ManyToOne(()=> User, user => user.id)
    user: User

    @JoinColumn()
    @OneToMany(()=> Likes, like => like.post)
    likes: Likes[];

    @CreateDateColumn({ type: 'date' })
    createdAt: string

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string

    @DeleteDateColumn({ type: 'date' })
    deletedAt: string
}

export default Posts;