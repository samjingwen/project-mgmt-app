import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {
  @Input("group") dataSource: any;
  @Input("displayed_columns") displayedColumns: any;
  @Input("lookup_columns") lookupColumns: any;

  controls: FormArray;

  constructor() {}

  ngOnInit() {
    const groups = this.dataSource.tasks.map(task => {
      const group = new FormGroup({});
      Object.keys(task).forEach(key => {
        group.addControl(key, new FormControl(task[key]))
      })
      return group;
    });
    this.controls = new FormArray(groups);
    console.log(this.controls);
  }

  updateField(index, fieldName){
    const control = this.getControl(index, fieldName);
    this.dataSource.tasks[index][fieldName] = control.value;
  }

  getControl(index, fieldName){
    return this.controls.at(index).get(fieldName) as FormControl;
  }
}
