import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BoardsService } from "./boards.service";
import { FormControl } from "@angular/forms";
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: "app-boards",
  templateUrl: "./boards.component.html",
  styleUrls: ["./boards.component.css"]
})
export class BoardsComponent implements OnInit {
  items = [
    { label: "Main Table", routerLink: "./table", icon: ["fas", "table"] },
    { label: "Kanban", routerLink: "./kanban", icon: ["fab", "trello"] }
  ];
  activeLink = this.items[0].label;

  tables: any;
  kanbans: any;

  boardControl: FormControl;
  currentBoardId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private boardsService: BoardsService
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
    })
  }

  changeBoard() {
    this.boardsService.selectedBoard$.next(this.boardControl.value);
    console.log(this.boardControl.value);
  }
}
