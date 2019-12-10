import { Component, OnInit } from "@angular/core";
import { BoardsService } from "../boards.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  boardId = "5deb90dc97265b80c79bbd31";
  board: any;

  constructor(private boardsService: BoardsService) {}

  ngOnInit() {
    this.boardsService.getBoardById(this.boardId).subscribe(result => {
      console.log(result);
      this.board = result;
    });


    this.boardsService.onUpdate().subscribe(board => {
      console.log(board);
      this.board = board;
    })
  }
}
