
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import User from './user';

@Entity('followers')
class Followers {
    @PrimaryGeneratedColumn('increment')
    id: number

    @JoinColumn()
    @OneToOne(()=> User, user => user.id)
    user: User

    @JoinColumn()
    @OneToMany(()=> User, user => user.id)
    userFollower: User

    @CreateDateColumn({ type: 'date' })
    createdAt: string
}

export default Followers;