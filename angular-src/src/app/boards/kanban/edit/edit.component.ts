import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  taskForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.createControls();

    // this.taskForm = this.fb.group({
    //   task_name: [this.data.task.task_name],
    //   owner: [this.data.task.owner]
    // })
  }

  createControls() {
    const formGroup = new FormGroup({});
    this.data.lookup_columns.forEach(column => {
      console.log(column);
      console.log(this.data.task[column]);
      formGroup.addControl(column, new FormControl(this.data.task[column]));
    });
    this.taskForm = formGroup;
  }

  getControl(lookupColumn) {
    return this.taskForm.get(lookupColumn);
  }

  update() {
    this.dialogRef.close({ success: "hahaah" });
  }

  close() {
    this.dialogRef.close();
  }
}
