import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BoardsComponent } from "./boards.component";
import { GroupsComponent } from "./table/groups/groups.component";
import { TasksComponent } from "./table/tasks/tasks.component";
import { TableComponent } from "./table/table.component";

const routes: Routes = [
  {
    path: "",
    component: BoardsComponent,
    children: [
      {
        path: "",
        children: [
          {
            path: "",
            // canActivate: [AuthGuard],
            loadChildren: () =>
              import("./table/table.module").then(m => m.TableModule)
          },
          {
            path: "table",
            // canActivate: [AuthGuard],
            loadChildren: () =>
              import("./table/table.module").then(m => m.TableModule)
          }
          // { path: "groups", component: GroupsComponent },
          // { path: "tasks", component: TasksComponent }
        ]
      }
    ]
  }
  // { path: "", component: BoardsComponent},
  // {
  //   path: "table",
  //   // canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import("./table/table.module").then(m => m.TableModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule {}
