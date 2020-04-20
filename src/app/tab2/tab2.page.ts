import { Component } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';

import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';
import { Response } from '../interfaces/response';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';



@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    // ionic g s path/nombre
    // ionic g i path/nombre
    // ionic g c path/name
    // ionic g m path/name
    // ionic g page path/name

    // npm install --save @ionic/storage


    public todos: any;

    constructor(
        private todoService: TodoService,
        private mc: ModalController,
        private tc: ToastController,
    ) { }

    async ionViewWillEnter() {
        this.getAll();
    }



    private async getAll() {
        // this.todos = await this.todoService.getAll();
        // console.log('los valores', this.todos);

        this.todoService.getAllTodos().subscribe(
            (data) => {
                this.todos = data.data;
            },
            async (error) => await this.presentToast(error)
        );
    }

    public async addTodo() {
        const ID = this.todoService.generateId();

        const TODO = {
            id: ID,
            title: `El texto que quieren ${ID}`,
            description: 'El me dijo esto "dkhfskdj"',
            completed: false
        };

        await this.todoService.add(ID, TODO);
        this.getAll();
    }

    public async deleteOne(id: string) {
        await this.todoService.deleteOne(id);
        this.getAll();
    }

    public async showAddForm() {
        const modal = await this.mc.create({
            component: TodoFormComponent
        });

        await modal.present();
        await modal.onWillDismiss();
        this.getAll();
        return await this.presentToast('Se agrego el todo correctamente');
    }

    private async presentToast(message:string) {
        const toast = await this.tc.create({
            message,
            duration: 3000
        });

        toast.present();
    }

}
