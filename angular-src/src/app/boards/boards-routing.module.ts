import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { BoardsComponent } from "./boards.component";
import { GroupsComponent } from "./table/groups/groups.component";
import { TasksComponent } from "./table/tasks/tasks.component";
import { TableComponent } from "./table/table.component";
import { KanbanComponent } from "./kanban/kanban.component";

const routes: Routes = [
  {
    path: "",
    component: BoardsComponent,
    children: [
      {
        path: "",
        children: [
          { path: "", component: TableComponent },
          { path: "table", component: TableComponent },
          { path: "kanban", component: KanbanComponent }
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
