import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/CreateTask.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {

    }

    @Get('')
    getAllTasks() {
        return this.tasksService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.getTaskById(id)
    }

    @Post('')
    createTask(@Body() createTaskDetails: CreateTaskDto) {
        return this.tasksService.createTask(createTaskDetails)

    }
}
