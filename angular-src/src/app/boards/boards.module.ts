import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsRoutingModule } from "./boards-routing.module";
import { BoardsComponent } from "./boards.component";
import { MaterialModule } from "../material.module";
import { KanbanComponent } from './kanban/kanban.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [BoardsComponent, KanbanComponent],
  imports: [CommonModule, BoardsRoutingModule, MaterialModule, FontAwesomeModule]
})
export class BoardsModule {}
