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
    return this.boardsService.getBoardsOfCurrentUser().pipe(
      map(boards => {
        const kanbans = boards.map(board => {
          const kanban = {};
          kanban['_id'] = board._id;
          board["statuses"].forEach(status => {
            kanban[status] = [];
          });
          kanban["Unassigned"] = [];
          board["groups"].forEach(group => {
            group.tasks.forEach(task => {
              if (!task.task_name) {
                return;
              }
              const item = {
                task: task,
                group_name: group.group_name,
                priorities: board["priorities"],
                owners: board["owners"],
                displayed_columns: board["displayed_columns"],
                lookup_columns: board["lookup_columns"],
                column_types: board["column_types"],
                statuses: board["statuses"]
              };
              if (task.status !== "") {
                kanban[task.status].push(item);
              } else {
                kanban["Unassigned"].push(item);
              }
            });
          });
          return kanban;
        });
        console.log({ tables : boards, kanbans: kanbans});
        return { tables : boards, kanbans: kanbans};
      })
    );
  }
}
