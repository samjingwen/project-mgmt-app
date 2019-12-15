import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsRoutingModule } from "./boards-routing.module";
import { BoardsComponent } from "./boards.component";
import { MaterialModule } from "../material.module";
import { KanbanComponent } from "./kanban/kanban.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditableComponent } from "../helpers/editable/editable.component";
import { TableComponent } from "./table/table.component";
import { GroupsComponent } from "./table/groups/groups.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FocusableDirective } from "../helpers/editable/focusable.directive";
import { EditComponent } from "./kanban/edit/edit.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SelectOwnerComponent } from "../helpers/select-owner/select-owner.component";

@NgModule({
  declarations: [
    BoardsComponent,
    KanbanComponent,
    EditableComponent,
    TableComponent,
    GroupsComponent,
    KanbanComponent,
    FocusableDirective,
    EditComponent,
    SelectOwnerComponent
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FlexLayoutModule
  ],
  entryComponents: [EditComponent, SelectOwnerComponent]
})
export class BoardsModule {}
