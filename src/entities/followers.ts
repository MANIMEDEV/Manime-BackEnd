
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
} from 'typeorm'
import User from './user';

@Entity('followers')
class Followers {
    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToOne(()=> User, user => user.id)
    user: User

    @OneToOne(()=> User, user => user.id)
    userFollower: User

    @CreateDateColumn({ type: 'date' })
    createdAt: string
}

export default Followers;