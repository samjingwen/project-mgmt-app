import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EditComponent } from "src/app/boards/kanban/edit/edit.component";
import { BoardsService } from "src/app/boards/boards.service";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-select-owner",
  templateUrl: "./select-owner.component.html",
  styleUrls: ["./select-owner.component.css"]
})
export class SelectOwnerComponent implements OnInit {
  selectForm: FormGroup;
  owners: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private boardsService: BoardsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.boardsService.getAllUsers().subscribe(users => {
      console.log(users);
      this.owners = (users as Array<any>).filter(x => x.user_id !== this.authService.currentUserId);

    });
    this.selectForm = this.fb.group({
      owner: ["", Validators.required]
    });
  }

  update() {
    if (this.selectForm.valid) {
      this.dialogRef.close({
        user_id: this.selectForm.value.owner.user_id,
        display_name: this.selectForm.value.owner.display_name
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
