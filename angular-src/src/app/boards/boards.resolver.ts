import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BoardsService } from "./boards.service";
import { Observable } from "rxjs";

@Injectable()
export class BoardsResolver implements Resolve<any> {
  apiUrl = environment.apiUrl;

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log("pre-fetching data");
    const boardId = route.params.boardId;
    return this.boardsService.getBoardById(boardId);
  }
}
