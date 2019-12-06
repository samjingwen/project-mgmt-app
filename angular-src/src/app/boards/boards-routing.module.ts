import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BoardsComponent } from "./boards/boards.component";
import { GroupsComponent } from "./groups/groups.component";
import { TasksComponent } from "./tasks/tasks.component";

const routes: Routes = [
  {
    path: "",
    component: BoardsComponent,
    children: [
      {
        path: "",
        children: [
          { path: "groups", component: GroupsComponent },
          { path: "tasks", component: TasksComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule {}
