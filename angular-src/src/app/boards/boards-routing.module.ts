import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { BoardsComponent } from "./boards.component";
import { TableComponent } from "./table/table.component";
import { KanbanComponent } from "./kanban/kanban.component";
import { TimelineComponent } from './timeline/timeline.component';

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
          { path: "kanban", component: KanbanComponent },
          { path: "timeline", component: TimelineComponent }
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
