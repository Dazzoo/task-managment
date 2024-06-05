import { Task } from "src/entities/task.entity";
import { TaskStatus } from "../types/tasks";
import { IsEnum } from "class-validator";

export class UpdateTaskDto {

    title: string;

    description: string;
    
}