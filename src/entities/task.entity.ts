import { TaskStatus } from "src/tasks/types/tasks";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus

    @ManyToOne(_type => User, user => user.tasks, { eager: true })
    user: User
}