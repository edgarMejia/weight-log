import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{ path: '', component: Tab2Page }])
    ],
    declarations: [
        Tab2Page,
        TodoFormComponent
    ],
    entryComponents: [
        TodoFormComponent
    ]
})
export class Tab2PageModule { }
