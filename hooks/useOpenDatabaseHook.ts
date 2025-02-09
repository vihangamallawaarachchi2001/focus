import { User } from '@/store/userStore';
import * as SQLite from 'expo-sqlite';

export type Task = {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}

export const createDbIfNeeded = async () => {
    const db = await SQLite.openDatabaseAsync('focus.db');

    await db.execAsync(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)`);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, completed BOOLEAN)`);
}

export const openDb = async () => {
    return await SQLite.openDatabaseAsync('focus.db');
};

export const useInsertTaskHook = async (name: string, description: string, completed: boolean) => {
    const db = await openDb();
    await db.runAsync(
        `INSERT INTO tasks (name, description, completed) VALUES (?, ?, ?)`,
        [name, description, completed]
    );
};

export const useGetAllTasksHook = async (): Promise<Task[] | null> =>{
    const db = await openDb();
    const result: Task[] | null = await db.getAllAsync(
        `SELECT * FROM tasks`
    )

    if ( result ) {
        return result;
    }
    return null;
}

export const getTaskById = async (id: number) => {
    const db = await openDb();
    const result = await db.getFirstAsync(
        `SELECT * FROM tasks WHERE id = ?`,
        [id]
    )
    return result ?? null;
}

export const useUpdateTaskHook = async ( id: number, name: string, description: string, completed: boolean) => {
    const db = await openDb();
    await db.runAsync(
        `UPDATE tasks SET name = ?, description = ?, completed = ? WHERE id = ?`,
        [name, description, completed, id]
    )

}

export const useDeleteTaskHook = async ( id: number) => {
    const db = await openDb();
    await db.runAsync(
        `DELETE FROM tasks WHERE id = ?`,
        [id]
    )
}

export const useGetProfile = async (): Promise<User | null> => {
    const db = await openDb();
    const result: User | null = await db.getFirstAsync(`SELECT * FROM users`);
    if (result && result.name && result.email && result.password) {
      return result;
    }
    return null;
  };
  

export const useInsertProfile = async (name: string, email: string, password: string) => {
    const db = await openDb();
    const response = await db.runAsync(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, password]
    )
    return response;

}

export const useGetAllUsers = async () => {
    const db = await openDb();
    const result = await db.getAllAsync(
        `SELECT * FROM users`
    )
    console.log(result);
}

export const useDeleteUser = async (id: number) => {
    const db = await openDb();
    await db.runAsync(
        `DELETE FROM users WHERE id = ?`,
        [id]
    )
}
