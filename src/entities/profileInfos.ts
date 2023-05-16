import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    Column,
    OneToOne,
} from 'typeorm'
import User from './user'

@Entity('profileInfos')
class ProfileInfos {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @Column({type:'text', nullable: true})
    description: string | null

    @Column({type:'number', default: 0})
    numberFollowers: number

    @Column({type:'number', default: 0})
    numberFollowing: number

    @Column({type:'number', default: 0})
    numberPosts: number

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