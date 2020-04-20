import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todo-form',
    templateUrl: './todo-form.component.html',
    styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
    public todoForm: FormGroup;

    constructor(
        private mc: ModalController,
        private fb: FormBuilder,
        private ts: TodoService,
    ) { }

    ngOnInit() {
        this.initTodoForm();
    }

    private initTodoForm() {
        this.todoForm = this.fb.group({
            title: [
                null,
                [
                    Validators.required
                ]
            ],
            description: [
                null,
                [
                    Validators.required
                ]
            ],
            completed: [
                false
            ],
        });
    }

    public addTodo() {
        console.log(this.todoForm.value);

        if (this.todoForm.valid) {
            this.ts.addTodo(this.todoForm.value).subscribe(
                async (data) => {
                    console.log(data);
                    // pt
                    if (data.success) {
                        return await this.closeModal();
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    public async closeModal() {
        return await this.mc.dismiss();
    }

}
