import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BoardsService } from "./boards.service";

@Component({
  selector: "app-boards",
  templateUrl: "./boards.component.html",
  styleUrls: ["./boards.component.css"]
})
export class BoardsComponent implements OnInit {
  items = [
    { label: "Main Table", routerLink: "./table", icon: ["fas", "table"] },
    { label: "Kanban", routerLink: "./kanban", icon: ["fab", "trello"] },
  ];
  activeLink = this.items[0].label;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private boardsService: BoardsService
  ) {
    this.boardsService.initSocket();
  }

  ngOnInit() {
    const boardId = this.activatedRoute.snapshot.params.boardId;
    // this.items = [
    //   {
    //     label: "Main Table",
    //     icon: "fa fa-fw fa-table",
    //     routerLink: ["./table"]
    //   },
    //   {
    //     label: "Timeline",
    //     icon: "fa fa-fw fa-calendar",
    //     routerLink: ["./tasks"]
    //   },
    //   { label: "Kanban", icon: "fa fa-fw fa-trello" }
    // ];
  }
}
