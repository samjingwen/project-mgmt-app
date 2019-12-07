import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {
  @Input("group") dataSource: any;
  @Input("displayed_columns") displayedColumns: any;
  @Input("lookup_columns") lookupColumns: any;

  constructor() {}

  ngOnInit() {}
}
