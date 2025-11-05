import {JsonController, Get, Param, Put, Post, Delete, Body} from 'routing-controllers';
import {tasksQueue} from "../queues/tasks.queue.js";
import {TaskRepository} from "../repositories/TaskRepository.js";
import {CreateTaskDTO, TaskID} from "../types/task.js";

@JsonController('/task')
export class TaskController {
  @Post('/')
  async create(@Body() data: CreateTaskDTO) {
    void tasksQueue.add('task:create', data);

    return null;
  }

  @Get('/:id')
  async read(@Param('id') id: TaskID) {
    return await TaskRepository.findById(id)
  }

  @Put('/:id')
  async update(@Param('id') id: TaskID, @Body() data: CreateTaskDTO) {
    void tasksQueue.add('task:update', JSON.stringify({id, data}));

    return null;
  }

  @Delete('/:id')
  async delete(@Param('id') id: TaskID) {
    void tasksQueue.add('task:delete', id);

    return null;
  }
}
