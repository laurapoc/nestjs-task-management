import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum.ts';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  CreateTask: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'laura',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

const mockTask = {
  title: 'test title',
  description: 'test description',
  id: 'someId',
  status: TaskStatus.OPEN,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    //initialize a NestJS moduke with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('GetTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');

      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toEqual('someValue');
    });

    it('calls TasksRepository.createTask and returns created task', async () => {
      tasksRepository.CreateTask.mockResolvedValue('someValue');

      const createdTask = await tasksService.createTask(null, mockUser);

      expect(createdTask).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('id', mockUser);

      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById('id', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
