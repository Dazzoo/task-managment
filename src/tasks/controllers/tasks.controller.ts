import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';

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
}
