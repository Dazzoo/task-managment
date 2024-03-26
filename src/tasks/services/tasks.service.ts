import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { TaskStatus } from '../types/tasks';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>
    ){

    }

    async getAllTasks(): Promise<Task[]> {
        const tasksList = await this.tasksRepository.find()
        if (!tasksList) {
            throw new HttpException('No tasks are found', HttpStatus.NOT_FOUND)
        }

        return tasksList
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({
            where: {
                id
            }
        })
        
        if (!task) {
            throw new HttpException(`Taks with ${id} is not found`, HttpStatus.NOT_FOUND)
        }

        return task
    }

    async createTask(createTaskDetails: CreateTaskDto): Promise<Task> {
        const newTask = await this.tasksRepository.create({
            ...createTaskDetails,
            status: TaskStatus.TO_DO
        })
        this.tasksRepository.save(newTask)

        return newTask
    }
}
