import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { BoardsService } from "./boards.service";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class BoardsResolver implements Resolve<any> {
  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {}

  // Fetch and transform data
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log("pre-fetching data");
    // const boardId = route.params.boardId;
    return this.boardsService.getBoardsOfCurrentUser();
  }
}
