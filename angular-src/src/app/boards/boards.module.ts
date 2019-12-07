import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsRoutingModule } from "./boards-routing.module";
import { PrimeNgModule } from "../primeng.module";
import { TableComponent } from './table/table.component';
import { BoardsComponent } from './boards.component';

@NgModule({
  declarations: [BoardsComponent],
  imports: [CommonModule, BoardsRoutingModule, PrimeNgModule]
})
export class BoardsModule {}
