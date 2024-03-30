import { IsEnum } from "class-validator";
import { TaskStatus } from "../types/tasks";


export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: string
}