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

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {
  @Input("group") dataSource: any;
  @Input() displayedColumns: any;
  @Input() lookupColumns: any;
  @Input() columnTypes: any;
  @Input() owners: any;
  @Input() statuses: any;
  @Input() priorities: any;

  controls: FormArray;

  constructor(private boardsService: BoardsService) {}

  ngOnInit() {
    this.createControls();
  }

  updateField(index, fieldName) {
    const control = this.getControl(index, fieldName);
    this.dataSource.tasks[index][fieldName] = control.value;
    this.boardsService.updateGroup(this.dataSource).subscribe();
  }

  createControls() {
    const groups = this.dataSource.tasks.map(task => {
      const group = new FormGroup({});
      Object.keys(task).forEach(key => {
        group.addControl(key, new FormControl(task[key]));
      });
      return group;
    });
    this.controls = new FormArray(groups);
  }

  undoChanges() {
    this.createControls();
  }

  // handleChange(index, fieldName){
  //   const control = this.getControl(index, fieldName);
  //   console.log(control.value);
  //   this.


  // }

  getControl(index, fieldName) {
    return this.controls.at(index).get(fieldName) as FormControl;
  }
}
