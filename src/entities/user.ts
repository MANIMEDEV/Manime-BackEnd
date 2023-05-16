import { getRounds, hashSync } from 'bcryptjs'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm'
import Followers from './followers'
import ProfileInfos from './profileInfos'

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45 })
    name: string
        
    @Column({type: 'varchar',length: 20, unique:true, nullable: false})
    nickname: string

    @Column({ type: 'varchar', length: 45, unique: true })
    email: string

    @Column({type: 'varchar',length: 20, unique:true, nullable: true})
    number: string | null

    @Column({type: 'text', default:'' })
    profileImg: string

    @Column({type: 'text', default:'' })
    bannerImg: string

    @Column({ type: 'boolean', default: false })
    banned: boolean

    @Column({ type: 'boolean', default: false })
    suspended: boolean

    @Column({ type: 'time'})
    suspendedTime: number | Date

    @Column({ type: 'boolean', default: false })
    admin: boolean

    @Column({type: 'boolean', default: false})
    verified: boolean // usuario verificado como perfil oficial

    @Column({type: 'boolean', default: false})
    confirmed: boolean // quando o usuario confirma o dado de email!

    @Column({ type: 'varchar', length: 120 })
    password: string

    @CreateDateColumn({ type: 'date' })
    createdAt: string

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string

    @DeleteDateColumn({ type: 'date' })
    deletedAt: string

    @JoinColumn()
    @OneToOne(()=> ProfileInfos,profileInfos => profileInfos.id)
    profileInfos: ProfileInfos

    @ManyToOne(()=> Followers, followers => followers.userFollower.id)
    followers: Followers[]


    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const isEncrypted: number = getRounds(this.password);
        if (!isEncrypted) {
            this.password = hashSync(this.password, 12);
        }
    }
}

export default User 