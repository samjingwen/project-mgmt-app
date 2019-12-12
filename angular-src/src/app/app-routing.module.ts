import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./common/home/home.component";
import { LoginComponent } from "./common/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { KanbanComponent } from "./boards/kanban/kanban.component";
import { BoardsResolver } from "./boards/boards.resolver";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {
    path: "boards/:boardId",
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import("./boards/boards.module").then(m => m.BoardsModule),
    resolve: { board: BoardsResolver }
  },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
