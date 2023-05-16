
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
} from 'typeorm'
import User from './user';

@Entity('posts')
class Posts {
    @PrimaryGeneratedColumn('increment')
    id: number


    @Column({type:'number', default: 0})
    numberShares: number

    @Column({type: 'text', nullable: true})
    description: string | null

    @Column({type: 'text', nullable: true})
    imgS: string | null

    @Column({type:'number', default: 0})
    likes: number
    
    
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