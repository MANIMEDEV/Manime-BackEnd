import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import ProfileInfos from './profileInfos'
import { Chat } from './chat'


@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 60 })
    fullName: string

    @Column({ type: 'varchar', length: 20, unique: true })
    nickname: string

    @Column({ type: 'varchar', length: 45, unique: true })
    email: string

    @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
    phone: string | null

    @Column({ type: 'text', default: '' })
    profileImg: string

    @Column({ type: 'text', default: '' })
    bannerImg: string

    @Column({ type: 'boolean', default: false })
    banned: boolean

    @Column({ type: 'boolean', default: false })
    suspended: boolean

    @Column({ type: 'time', nullable: true })
    suspendedTime: number | Date | null

    @Column({ type: 'boolean', default: false })
    admin: boolean

    @Column({ type: 'boolean', default: false })
    verified: boolean // usuario verificado como perfil oficial

    @Column({ type: 'boolean', default: false })
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
    @OneToOne(() => ProfileInfos, profileInfos => profileInfos.id)
    profileInfos: ProfileInfos

    @ManyToMany(() => Chat, chat => chat.users)
    @JoinTable()
    chats: Chat[];

    @ManyToMany(() => User, (user) => user.followers)
    @JoinTable()
    followers: User[];

    @ManyToMany(() => User, (user) => user.following)
    @JoinTable()
    following: User[];

    follow(user: User): void {
        if (!this.following) {
            this.following = [];
        }

        this.following.push(user);
    }

    unfollow(user: User): void {
        if (this.following) {
            this.following = this.following.filter((u) => u.id !== user.id);
        }
    }

}

export default User 