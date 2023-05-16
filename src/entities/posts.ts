
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    JoinColumn,
    OneToOne,
} from 'typeorm'
import User from './user';

@Entity('posts')
class Posts {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type:'integer', default: 0})
    numberShares: number

    @Column({type: 'text', nullable: true})
    description: string | null

    @Column({type: 'text', nullable: true})
    imgS: string | null

    @Column({type:'integer', default: 0})
    likes: number

    @JoinColumn()
    @OneToOne(()=> User, user => user.id)
    user: User

    @CreateDateColumn({ type: 'date' })
    createdAt: string

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string

    @DeleteDateColumn({ type: 'date' })
    deletedAt: string
}

export default Posts;