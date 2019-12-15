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

  private socket;

  selectedBoard$ = new BehaviorSubject("");

  constructor(private http: HttpClient, private authService: AuthService) {}

  initSocket() {
    console.log(">>>>> " + this.WS_SERVER_URL);
    this.socket = socketIo(this.WS_SERVER_URL);
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
    return this.http.post(`/api/boards/update`, group);

    // this.socket.emit("updateBoard", group);
  }

  onUpdate(): Observable<any> {
    console.log("patching new values to all sessions");
    return fromEvent(this.socket, "onUpdate");
  }

  addOwnertoBoard(){
    return this.http.post(`/api/boards/owner`, {});
  }
}
