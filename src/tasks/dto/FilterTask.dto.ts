import { TaskStatus } from "../types/tasks"


export class FilterTaskDto {
    search: string;
    status: TaskStatus;
}