import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskStatusDto } from '../dto/UpdateTaskStatus.dto';

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
    @Patch('/:id')
    updateTaskStatus(
        @Param('id', ParseUUIDPipe) id : string,
        @Body() updateTaskStatusDetails: UpdateTaskStatusDto
        ) {
        return this.tasksService.updateTaskStatusById(id, updateTaskStatusDetails)
    }

}
