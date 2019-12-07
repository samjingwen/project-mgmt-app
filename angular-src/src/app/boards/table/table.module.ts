import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { TableRoutingModule } from "./table-routing.module";
import { PrimeNgModule } from "src/app/primeng.module";
import { GroupsComponent } from "./groups/groups.component";
import { TasksComponent } from "./tasks/tasks.component";

@NgModule({
  declarations: [TableComponent, GroupsComponent, TasksComponent],
  imports: [CommonModule, TableRoutingModule, PrimeNgModule]
})
export class TableModule {}
