import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Todo } from '../interfaces/todo';
import { Response } from '../interfaces/response';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private readonly BASE_URL = 'http://localhost:3000';

    constructor(
        private storage: Storage,
        private http: HttpClient,
    ) { }

    public generateId() {
        return String(new Date().getTime());
    }

    public async getAll(): Promise<Todo[]> {
        const todos: Array<Todo> = [];

        await this.storage.forEach(value => {
            todos.push(value);
        });

        return todos;
    }

    public add(id: string, todo: Todo) {
        return this.storage.set(id, todo);
    }

    public addTodo(todo: Todo) {
        const formBody = 'title=' + todo.title + '&description='+ todo.description + '&completed=' + todo.completed;

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.post<Response>(`${this.BASE_URL}/api/todo/save`, formBody, {headers});
    }

    public getAllTodos() {
        return this.http.get<Response>(`${this.BASE_URL}/api/todo/get`);
    }

    public deleteOne(id: string) {
        return this.storage.remove(id);
    }

}
