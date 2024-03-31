import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskStatusDto } from '../dto/UpdateTaskStatus.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { FilterTaskDto } from '../dto/FilterTask.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {

    }

    @Get('f')
    getAllTasksWithFilter(
        @Query('') filter: FilterTaskDto
    ) {
        return this.tasksService.getTasksWithFilter(filter)
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.getTaskById(id)
    }

    @Post('')
    createTask(@Body() createTaskDetails: CreateTaskDto) {
        return this.tasksService.createTask(createTaskDetails)

    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseUUIDPipe) id : string,
        @Body() updateTaskStatusDetails: UpdateTaskStatusDto
        ) {
        return this.tasksService.updateTaskStatusById(id, updateTaskStatusDetails)
    }

    @Patch('/:id')
    updateTask(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTaskDetails: UpdateTaskDto
    ) {
        return this.tasksService.updateTask(id, updateTaskDetails)
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.tasksService.deleteTaskById(id)
    }
    

}
