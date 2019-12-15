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
  tables: any;
  boardId: string;
  table: any;

  constructor(
    private boardsService: BoardsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch data from resolver
    this.activatedRoute.data.subscribe(data => {
      this.tables = data.boards.tables;
    });


    this.boardsService.selectedBoard$.subscribe(boardId => {
      this.boardId = boardId;
      this.table = this.tables.find(x => x._id === this.boardId);
    });

    this.boardsService.onUpdate().subscribe(data => {
      console.log('>>>>data', data);
      this.tables = data.tables;
      this.table = this.tables.find(x => x._id === this.boardId);
    })

    // this.board = this.boardsService.onUpdate().subscribe(board => {
    //   console.log(board);
    //   this.board = board;
    // });
  }
}
