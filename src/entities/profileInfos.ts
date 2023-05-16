import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import User from './user'

@Entity('profileInfos')
class ProfileInfos {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @Column({type:'text', nullable: true})
    description: string | null

    @Column({type:'integer', default: 0})
    numberFollowers: number

    @Column({type:'integer', default: 0})
    numberFollowing: number

    @Column({type:'integer', default: 0})
    numberPosts: number

    @JoinColumn()
    @OneToOne(()=> User,user => user.id)
    user: User

    @CreateDateColumn({ type: 'date' })
    createdAt: string

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string

    @DeleteDateColumn({ type: 'date' })
    deletedAt: string
}

export default ProfileInfos;