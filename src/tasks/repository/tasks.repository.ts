import { Injectable } from "@nestjs/common";
import { Task } from "src/typeorm/entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksRepository extends Repository<Task> {

}