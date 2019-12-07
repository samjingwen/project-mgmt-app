import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-boards",
  templateUrl: "./boards.component.html",
  styleUrls: ["./boards.component.css"]
})
export class BoardsComponent implements OnInit {
  items = [
    { label: "Main Table", routerLink: "./table", icon: ['fas', 'table'] },
    { label: "Kanban", routerLink: "./kanban", icon: ['fab', 'trello'] },
    { label: "Timeline", routerLink: "./timeline", icon: ['fas', 'calendar-alt'] }
  ];
  activeLink = this.items[0].label;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
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
