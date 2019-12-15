import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BoardsService } from "./boards.service";
import { FormControl } from "@angular/forms";
import { Subject, BehaviorSubject, merge } from "rxjs";
import { MatDialog } from "@angular/material";
import { EditComponent } from "./kanban/edit/edit.component";
import { SelectOwnerComponent } from "../helpers/select-owner/select-owner.component";
import { map } from "rxjs/operators";

@Component({
  selector: "app-boards",
  templateUrl: "./boards.component.html",
  styleUrls: ["./boards.component.css"]
})
export class BoardsComponent implements OnInit {
  // items = [
  //   { label: "Main Table", routerLink: "./table", icon: ["fas", "table"] },
  //   { label: "Kanban", routerLink: "./kanban", icon: ["fab", "trello"] }
  // ];
  // activeLink = this.items[0].label;

  tables: any;
  kanbans: any;

  boardControl: FormControl;
  currentBoardId: string;
  currentBoardName: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private boardsService: BoardsService,
    public dialog: MatDialog
  ) {
    this.boardsService.initSocket();
  }

  ngOnInit() {
    // const boardId = this.activatedRoute.snapshot.params.boardId;

    this.activatedRoute.data.subscribe(data => {
      console.log(data);
      this.tables = data.boards.tables;
      this.kanbans = data.boards.kanbans;
      this.boardControl = new FormControl(this.tables[0]._id);
      this.boardsService.selectedBoard$.next(this.boardControl.value);
      // this.router.navigate(["/boards/table", this.tables[0]._id]);
    });

    this.boardsService.selectedBoard$.subscribe(boardId => {
      this.currentBoardId = boardId;
      this.currentBoardName = this.tables.find(
        x => x._id === boardId
      ).board_name;
    });

    // this.boardsService.onUpdate().subscribe(() => {
    //   this.boardsService
    //     .getBoardsOfCurrentUser()
    //     .pipe(
    //       map(boards => {
    //         const kanbans = boards.map(board => {
    //           const kanban = {};
    //           kanban["_id"] = board._id;
    //           board["statuses"].forEach(status => {
    //             kanban[status] = [];
    //           });
    //           kanban["Unassigned"] = [];
    //           board["groups"].forEach(group => {
    //             group.tasks.forEach(task => {
    //               if (!task.task_name) {
    //                 return;
    //               }
    //               const item = {
    //                 task: task,
    //                 group_name: group.group_name,
    //                 priorities: board["priorities"],
    //                 owners: board["owners"],
    //                 displayed_columns: board["displayed_columns"],
    //                 lookup_columns: board["lookup_columns"],
    //                 column_types: board["column_types"],
    //                 statuses: board["statuses"]
    //               };
    //               if (task.status !== "") {
    //                 kanban[task.status].push(item);
    //               } else {
    //                 kanban["Unassigned"].push(item);
    //               }
    //             });
    //           });
    //           return kanban;
    //         });
    //         console.log({ tables: boards, kanbans: kanbans });
    //         return { tables: boards, kanbans: kanbans };
    //       })
    //     )
    //     .subscribe(data => {
    //       this.tables = data["tables"];
    //       this.kanbans = data["kanbans"];
    //       this.boardControl = new FormControl(this.tables[0]._id);
    //       this.boardsService.selectedBoard$.next(this.boardControl.value);
    //     });
    // });
  }

  addNewBoard() {
    console.log("asds");
    this.boardsService.createNewBoard().subscribe(() => {
      console.log("asdasd");
    });
  }

  changeBoard() {
    this.boardsService.selectedBoard$.next(this.boardControl.value);
    console.log(this.boardControl.value);
  }

  openSelectOwnerDialog() {
    const dialogRef = this.dialog.open(SelectOwnerComponent, {
      disableClose: true,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(user => {
      console.log(user);
      this.boardsService.addOwnertoBoard(user).subscribe();
    });
  }
}
