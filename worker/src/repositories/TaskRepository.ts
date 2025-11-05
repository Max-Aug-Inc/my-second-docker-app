import {postgres} from "../postgres.js";
import {CreateTaskDTO, Task, TaskID, UpdateTaskDTO} from "../types/task.js";

export const TaskRepository = {
  create: async (taskData: CreateTaskDTO): Promise<Task> => {
    const {title, description, status, dueAt} = taskData;

    const response = await postgres.query(
      `INSERT INTO tasks (title, description, status, due_at, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [title, description || null, status, dueAt || null]
    );

    return response.rows[0];
  },

  update: async (id: TaskID, taskData: UpdateTaskDTO): Promise<number> => {
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(taskData)) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    values.push(id);

    const response = await postgres.query(`
      UPDATE tasks
      SET ${fields.join(', ')},
          updated_at = NOW()
      WHERE id = $${index}
    `, values);

    return response.oid
  },

  delete: async (id: TaskID): Promise<number> => {
    const response = await postgres.query('DELETE FROM tasks WHERE id = $1', [id]);

    return response.oid
  },
}
