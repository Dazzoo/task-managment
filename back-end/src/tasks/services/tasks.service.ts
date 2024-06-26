import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { TaskStatus } from '../types/tasks';
import { UpdateTaskStatusDto } from '../dto/UpdateTaskStatus.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { FilterTaskDto } from '../dto/FilterTask.dto';
import { User } from 'src/entities/users.entity';

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

    async getTasksWithFilter(filter: FilterTaskDto, user: User): Promise<Task[]> {

        const { search, status } = filter

        console.log(filter)

        const query = this.tasksRepository.createQueryBuilder('task')

        query.andWhere({
            user
        })

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', {
                search: `%${search}%`
            })
        }
        
        const tasks = await query.getMany()

        return tasks

    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const task = await this.tasksRepository.findOne({
            where: {
                id,
                user
            }
        })
        
        if (!task) {
            throw new HttpException(`Taks with ${id} is not found`, HttpStatus.NOT_FOUND)
        }

        return task
    }

    async createTask(createTaskDetails: CreateTaskDto, user: User): Promise<Task> {
        const newTask = await this.tasksRepository.create({
            ...createTaskDetails,
            status: TaskStatus.TO_DO,
            user
        })
        this.tasksRepository.save(newTask)

        return newTask
    }

    async updateTaskStatusById(id: string, statusDto: UpdateTaskStatusDto, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)

        task.status = statusDto.status

        const updatedTask = await this.tasksRepository.save(task)

        return updatedTask
    }

    async updateTask(id: string, taskDetailsDto: UpdateTaskDto, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)

        if (taskDetailsDto.title !== undefined) {
            task.title = taskDetailsDto.title;
        }

        if (taskDetailsDto.description !== undefined) {
            task.description = taskDetailsDto.description;
        }
    
        return await this.tasksRepository.save(task);
        
    }

    async deleteTaskById(id, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)

        return await this.tasksRepository.remove(task)
    }
}
