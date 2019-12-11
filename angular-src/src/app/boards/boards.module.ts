import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsRoutingModule } from "./boards-routing.module";
import { BoardsComponent } from "./boards.component";
import { MaterialModule } from "../material.module";
import { KanbanComponent } from "./kanban/kanban.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditableComponent } from "./editable/editable.component";
import { TableComponent } from "./table/table.component";
import { GroupsComponent } from './table/groups/groups.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FocusableDirective } from './editable/focusable.directive';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    BoardsComponent,
    KanbanComponent,
    EditableComponent,
    TableComponent,
    TimelineComponent,
    GroupsComponent,
    KanbanComponent,
    FocusableDirective,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class BoardsModule {}
