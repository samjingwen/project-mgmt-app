import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  getBoardById(boardId: string){
    return this.http.get(`/api/boards/${boardId}`);
  }
}
