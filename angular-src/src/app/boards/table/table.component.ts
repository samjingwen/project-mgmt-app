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

  constructor(private boardService: BoardsService) {}

  ngOnInit() {
    this.boardService.getBoardById(this.boardId).subscribe(result => {
      console.log(result);
      this.board = result['payload'];
    });
  }
}
