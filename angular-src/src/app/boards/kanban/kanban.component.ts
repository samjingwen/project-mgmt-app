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
  todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];

  done = ["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"];

  boardId = "5deb90dc97265b80c79bbd31";
  // board: any;
  kanban: any;

  constructor(
    private boardsService: BoardsService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Load data before loading component
    this.activatedRoute.data.subscribe(data => {
      this.kanban = data.board.kanban;
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
