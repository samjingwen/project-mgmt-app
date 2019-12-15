import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import * as socketIo from "socket.io-client";
import { fromEvent, Observable, BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BoardsService {
  WS_SERVER_URL =  'ws://productivvapp.herokuapp.com:3000';
  // WS_SERVER_URL = environment.socketServerUrl;

  private socket;

  selectedBoard$ = new BehaviorSubject("");
  selectedBoard: string;

  constructor(private http: HttpClient, private authService: AuthService) {}

  initSocket() {
    console.log(">>>>> " + this.WS_SERVER_URL);
    this.socket = socketIo(this.WS_SERVER_URL);
    this.selectedBoard$.subscribe(boardId => {
      this.selectedBoard = boardId;
    });
  }

  getBoardById(boardId: string) {
    return this.http.get(`/api/boards/${boardId}`);
  }

  getBoardsOfCurrentUser() {
    return this.http
      .get(`/api/boards/user/${this.authService.currentUserId}`)
      .pipe(
        map(data => {
          return data as Array<any>;
        }),
        map(boards => {
          const kanbans = boards.map(board => {
            const kanban = {};
            kanban["_id"] = board._id;
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
          console.log({ tables: boards, kanbans: kanbans });
          return { tables: boards, kanbans: kanbans };
        })
      );
  }

  createNewBoard() {
    const params = new HttpParams()
      .set("userId", this.authService.currentUserId)
      .set("displayName", this.authService.loggedInUser);
    return this.http.post(`/api/boards/create/`, params);
  }

  updateGroup(group) {
    // return this.http.post(`/api/boards/update`, group);

    this.socket.emit("updateBoard", { group, userId: this.authService.currentUserId});
  }

  onUpdate(): Observable<any> {
    return fromEvent(this.socket, "onUpdate").pipe(
      map(data => {
        return data as Array<any>;
      }),
      map(boards => {
        const kanbans = boards.map(board => {
          const kanban = {};
          kanban["_id"] = board._id;
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
        console.log({ tables: boards, kanbans: kanbans });
        return { tables: boards, kanbans: kanbans };
      })
    );
  }

  addOwnertoBoard(user) {
    // const params = new HttpParams().set("user_id", userId);
    return this.http.post(`/api/boards/owner`, {
      user,
      boardId: this.selectedBoard
    });
  }

  getAllUsers() {
    return this.http.get("/api/user/all");
  }
}
