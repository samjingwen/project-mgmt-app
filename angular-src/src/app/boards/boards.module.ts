import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupsComponent } from "./groups/groups.component";
import { TasksComponent } from "./tasks/tasks.component";
import { BoardsComponent } from "./boards/boards.component";
import { BoardsRoutingModule } from "./boards-routing.module";
import { PrimeNgModule } from "../primeng.module";

@NgModule({
  declarations: [GroupsComponent, TasksComponent, BoardsComponent],
  imports: [CommonModule, BoardsRoutingModule, PrimeNgModule]
})
export class BoardsModule {}
