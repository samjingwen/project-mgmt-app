import { Component, OnInit } from "@angular/core";
import { TabMenuModule } from "primeng/tabmenu";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-boards",
  templateUrl: "./boards.component.html",
  styleUrls: ["./boards.component.css"]
})
export class BoardsComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: "Main Table",
        icon: "fa fa-fw fa-table",
        routerLink: ["./groups"]
      },
      {
        label: "Timeline",
        icon: "fa fa-fw fa-calendar",
        routerLink: ["./tasks"]
      },
      { label: "Kanban", icon: "fa fa-fw fa-trello" }
    ];

    this.activeItem = this.items[0];
  }
}
