import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BoardsComponent } from "./boards.component";
import { TableComponent } from "./table/table.component";
import { KanbanComponent } from "./kanban/kanban.component";
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: BoardsComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        children: [
          { path: "", component: TableComponent },
          { path: "table", component: TableComponent },
          { path: "kanban", component: KanbanComponent },
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
