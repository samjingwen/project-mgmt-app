import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import * as socketIo from "socket.io-client";
import { fromEvent, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BoardsService {
  apiUrl = environment.apiUrl;
  WS_SERVER_URL = environment.socketServerUrl;

  private socket;

  constructor(private http: HttpClient) {}

  initSocket() {
    console.log(">>>>> " + this.WS_SERVER_URL);
    this.socket = socketIo(this.WS_SERVER_URL);
  }

  getBoardById(boardId: string) {
    return this.http.get(`${this.apiUrl}/boards/${boardId}`);
  }

  updateGroup(group) {
    return this.http.post(`${this.apiUrl}/boards/update`, group);

    // this.socket.emit("updateBoard", group);
  }

  onUpdate(): Observable<any> {
    console.log('patching new values to all sessions');
    return fromEvent(this.socket, "onUpdate");
  }
}
