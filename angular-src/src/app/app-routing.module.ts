import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./common/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { KanbanComponent } from "./boards/kanban/kanban.component";
import { BoardsResolver } from "./boards/boards.resolver";
import { RegisterComponent } from './common/register/register.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "boards",
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import("./boards/boards.module").then(m => m.BoardsModule),
    resolve: { boards: BoardsResolver }
  },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
