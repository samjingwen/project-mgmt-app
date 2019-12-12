import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { BoardsService } from "./boards.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class BoardsResolver implements Resolve<any> {
  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log("pre-fetching data");
    // const boardId = route.params.boardId;
    return this.boardsService.getBoardsOfCurrentUser().pipe(
      map(boards => boards as Array<any>),
      map(boards => {
        boards.map(board => {
          const kanban = {};
          board["statuses"].forEach(status => {
            kanban[status] = [];
          });
          kanban["Unassigned"] = [];
          board["groups"].forEach(group => {
            group.tasks.forEach(task => {
              if (!task.task_name) {
                return;
              }
              if (task.status !== "") {
                kanban[task.status].push({
                  task: task,
                  group_name: group.group_name,
                  priorities: board["priorities"],
                  owners: board["owners"],
                  displayed_columns: board["displayed_columns"],
                  lookup_columns: board["lookup_columns"],
                  column_types: board["column_types"],
                  statuses: board["statuses"]
                });
              } else {
                kanban["Unassigned"].push({
                  task: task,
                  group_name: group.group_name,
                  priorities: board["priorities"],
                  owners: board["owners"],
                  displayed_columns: board["displayed_columns"],
                  lookup_columns: board["lookup_columns"],
                  column_types: board["column_types"],
                  statuses: board["statuses"]
                });
              }
            });
          });
          return { table: board, kanban: kanban };
        });
      })
    );
  }
}
