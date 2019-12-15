import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { BoardsService } from "../boards.service";
import { MatDialog } from "@angular/material";
import { EditComponent } from "./edit/edit.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-kanban",
  templateUrl: "./kanban.component.html",
  styleUrls: ["./kanban.component.css"]
})
export class KanbanComponent implements OnInit {
  kanbans: any;
  boardId: string;
  kanban: any;

  constructor(
    private boardsService: BoardsService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch data from resolver
    this.activatedRoute.data.subscribe(data => {
      console.log("kanbans:", data.boards.kanbans);
      this.kanbans = data.boards.kanbans;
    });

    this.boardsService.selectedBoard$.subscribe(boardId => {
      this.boardId = boardId;
      this.kanban = this.kanbans.find(x => x._id === this.boardId);
      console.log(this.kanban);
    });

    // this.boardsService.getBoardById(this.boardId).subscribe(result => {
    //   this.board = result;
    //   this.transform();
    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // TODO: Move to resolver
  // transform() {
  //   this.board.statuses.forEach(status => {
  //     this.kanban[status] = [];
  //   });
  //   this.kanban["Unassigned"] = [];
  //   this.board.groups.forEach(group => {
  //     group.tasks.forEach(task => {
  //       if (!task.task_name) {
  //         return;
  //       }
  //       if (task.status !== "") {
  //         this.kanban[task.status].push({
  //           task: task,
  //           group_name: group.group_name,
  //           priorities: this.board.priorities,
  //           owners: this.board.owners,
  //           displayed_columns: this.board.displayed_columns,
  //           lookup_columns: this.board.lookup_columns,
  //           column_types: this.board.column_types,
  //           statuses: this.board.statuses
  //         });
  //       } else {
  //         this.kanban["Unassigned"].push({
  //           task: task,
  //           group_name: group.group_name,
  //           priorities: this.board.priorities,
  //           owners: this.board.owners,
  //           displayed_columns: this.board.displayed_columns,
  //           lookup_columns: this.board.lookup_columns,
  //           column_types: this.board.column_types,
  //           statuses: this.board.statuses
  //         });
  //       }
  //     });
  //   });
  // }

  openDialog(task) {
    const dialogRef = this.dialog.open(EditComponent, {
      disableClose: true,
      autoFocus: true,
      data: task
    });
    dialogRef.afterClosed().subscribe(task => {});
  }
}
