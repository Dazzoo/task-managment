import { IsNotEmpty } from "class-validator";
import { TaskStatus } from "../types/tasks";

export class CreateTaskDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

}