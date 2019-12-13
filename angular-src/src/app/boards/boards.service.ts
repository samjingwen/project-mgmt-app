import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import * as socketIo from "socket.io-client";
import { fromEvent, Observable, BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BoardsService {
  apiUrl = environment.apiUrl;
  WS_SERVER_URL = environment.socketServerUrl;

  private socket;

  selectedBoard$ = new BehaviorSubject("");

  constructor(private http: HttpClient, private authService: AuthService) {}

  initSocket() {
    console.log(">>>>> " + this.WS_SERVER_URL);
    this.socket = socketIo(this.WS_SERVER_URL);
  }

  getBoardById(boardId: string) {
    return this.http.get(`${this.apiUrl}/boards/${boardId}`);
  }

  getBoardsOfCurrentUser() {
    return this.http
      .get(`${this.apiUrl}/boards/user/${this.authService.currentUserId}`)
      .pipe(
        map(data => {
          return data as Array<any>;
        })
      );
  }

  updateGroup(group) {
    return this.http.post(`${this.apiUrl}/boards/update`, group);

    // this.socket.emit("updateBoard", group);
  }

  onUpdate(): Observable<any> {
    console.log("patching new values to all sessions");
    return fromEvent(this.socket, "onUpdate");
  }
}
