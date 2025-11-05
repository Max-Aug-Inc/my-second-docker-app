export type IsoDateString = string;  // ISO 8601
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskID = 'number';
export type Task = {
  id: TaskID;
  title: string;
  description?: string;
  status: TaskStatus;
  dueAt?: IsoDateString;
  completedAt?: IsoDateString;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

export type CreateTaskDTO = Pick<Task, 'title' | 'description' | 'status' | 'dueAt'>;
export type UpdateTaskDTO = Partial<Pick<Task, 'title' | 'description' | 'status' | 'dueAt' | 'completedAt'>>;
