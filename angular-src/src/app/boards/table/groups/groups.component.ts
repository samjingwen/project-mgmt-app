import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { BoardsService } from "../../boards.service";
import * as moment from "moment";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {
  @Input() group: any;
  @Input() displayedColumns: any;
  @Input() lookupColumns: any;
  @Input() columnTypes: any;
  @Input() owners: any;
  @Input() statuses: any;
  @Input() priorities: any;

  dataSource = new BehaviorSubject({});
  controls: FormArray;

  constructor(private boardsService: BoardsService) {}

  ngOnInit() {
    this.createControls();
    this.dataSource.next(this.group.tasks);
  }

  updateField(index, fieldName) {
    const control = this.getControl(index, fieldName);
    this.group.tasks[index][fieldName] = control.value;
    this.boardsService.updateGroup(this.group).subscribe();
  }

  // one form group per task
  createControls() {
    const formGroups = this.group.tasks.map(task => {
      const formGroup = new FormGroup({});
      Object.keys(task).forEach(key => {
        formGroup.addControl(key, new FormControl(task[key]));
      });
      return formGroup;
    });
    this.controls = new FormArray(formGroups);
  }

  undoChanges() {
    this.createControls();
  }

  // handleChange(index, fieldName){
  //   const control = this.getControl(index, fieldName);
  //   console.log(control.value);
  //   this.


  // }



  createTask(){
    const task = {};
    const formGroup = new FormGroup({});
    this.lookupColumns.forEach(column => {
      formGroup.addControl(column, new FormControl(""));
      task[column] = "";
    })
    this.controls.push(formGroup);
    this.group.tasks.push(task);
    this.dataSource.next(this.group.tasks);
    console.log(this.dataSource);
    console.log(this.controls);
  }

  getControl(index, fieldName) {
    return this.controls.at(index).get(fieldName) as FormControl;
  }
}
