import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskStatusDto } from '../dto/UpdateTaskStatus.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { FilterTaskDto } from '../dto/FilterTask.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/users.entity';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {

    }

    @Get('')
    getAllTasksWithFilter(
        @Query('') filter: FilterTaskDto,
        @GetUser() user: User,
    ) {
        return this.tasksService.getTasksWithFilter(filter, user)
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.getTaskById(id)
    }

    @Post('')
    createTask(
        @Body() createTaskDetails: CreateTaskDto,
        @GetUser() user: User
    ) {
        return this.tasksService.createTask(createTaskDetails, user)

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
