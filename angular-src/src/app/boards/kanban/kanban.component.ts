import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { BoardsService } from "../boards.service";

@Component({
  selector: "app-kanban",
  templateUrl: "./kanban.component.html",
  styleUrls: ["./kanban.component.css"]
})
export class KanbanComponent implements OnInit {
  todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];

  done = ["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"];

  boardId = "5deb90dc97265b80c79bbd31";
  board: any;
  kanban = {};

  constructor(private boardsService: BoardsService) {}

  ngOnInit() {
    this.boardsService.getBoardById(this.boardId).subscribe(result => {
      console.log(result);
      this.board = result;
      this.transform();
      console.log(this.kanban);
    });
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

  transform() {
    this.board.statuses.forEach(status => {
      this.kanban[status] = [];
    });
    this.kanban["Unassigned"] = [];
    this.board.groups.forEach(group => {
      group.tasks.forEach(task => {
        if (!task.task_name) {
          return;
        }
        if (task.status !== "") {
          this.kanban[task.status].push({
            task_name: task.task_name,
            group_name: group.group_name
          });
        } else {
          this.kanban["Unassigned"].push({
            task_name: task.task_name,
            group_name: group.group_name
          });
        }
      });
    });
  }
}
