import { Component, OnInit } from "@angular/core";
import { BoardsService } from "../boards.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  // boardId = "5deb90dc97265b80c79bbd31";
  table: any;

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Load data before loading component
    this.activatedRoute.data.subscribe(data => {
      this.table = data.board.table;
    });

    // this.board = this.boardsService.onUpdate().subscribe(board => {
    //   console.log(board);
    //   this.board = board;
    // });
  }
}
