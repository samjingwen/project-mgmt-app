import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { TasksComponent } from './tasks/tasks.component';
import { BoardsComponent } from './boards/boards.component';



@NgModule({
  declarations: [GroupsComponent, TasksComponent, BoardsComponent],
  imports: [
    CommonModule
  ]
})
export class BoardsModule { }
