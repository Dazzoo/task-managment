import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { TaskStatus } from '../types/tasks';
import { UpdateTaskStatusDto } from '../dto/UpdateTaskStatus.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { FilterTaskDto } from '../dto/FilterTask.dto';

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

    async getTasksWithFilter(filter: FilterTaskDto): Promise<Task[]> {

        const { search, status } = filter

        // TO DO : WORKS WRONG WITH QUERY AND SPACES, FIND A SOLUTION

        console.log(filter)

        const query = this.tasksRepository.createQueryBuilder('task')

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', {
                search: `%${search}%`
            })
        }
        
        const tasks = await query.getMany()

        return tasks

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

    async updateTaskStatusById(id: string, statusDto: UpdateTaskStatusDto): Promise<Task> {
        const task = await this.getTaskById(id)

        task.status = statusDto.status

        const updatedTask = await this.tasksRepository.save(task)

        return updatedTask
    }

    async updateTask(id: string, taskDetailsDto: UpdateTaskDto): Promise<Task> {
        const task = await this.getTaskById(id)

        if (taskDetailsDto.title !== undefined) {
            task.title = taskDetailsDto.title;
        }

        if (taskDetailsDto.description !== undefined) {
            task.description = taskDetailsDto.description;
        }
    
        return await this.tasksRepository.save(task);
        
    }

    async deleteTaskById(id): Promise<Task> {
        const task = await this.getTaskById(id)

        return await this.tasksRepository.remove(task)
    }
}
