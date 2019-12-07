import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { TableRoutingModule } from "./table-routing.module";
import { GroupsComponent } from "./groups/groups.component";
import { TasksComponent } from "./tasks/tasks.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/material.module";

@NgModule({
  declarations: [TableComponent, GroupsComponent, TasksComponent],
  imports: [CommonModule, TableRoutingModule, FontAwesomeModule, MaterialModule]
})
export class TableModule {}
