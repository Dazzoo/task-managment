import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    password: string;

    @OneToMany(_task => Task, task => task.user)
    tasks: Task[]
}