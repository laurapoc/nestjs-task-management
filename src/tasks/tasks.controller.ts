import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum.ts';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  // getAllTasks(@Query() _): Promise<Task[]> {
  //   return this.tasksService.getAllTasks();
  // }

  // @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // MY WORKING SOLUTION:
  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<{}> {
    await this.tasksService.deleteTask(id);

    return {
      success: true,
      message: `Task with id ${id} successfully deleted.`,
    };
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<{}> {
    const { status } = updateTaskStatusDto;
    await this.tasksService.updateTaskStatus(id, status);

    return {
      success: true,
      message: `Task with id ${id} successfully updated.`,
    };
  }
}
