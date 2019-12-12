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
  board: any;

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Load data before loading component
    this.board = this.route.snapshot.data.board;

    // this.board = this.boardsService.onUpdate().subscribe(board => {
    //   console.log(board);
    //   this.board = board;
    // });
  }
}
