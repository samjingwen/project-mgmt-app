import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @Input() group: any;
  @Input() columns: any;

  constructor() { }

  ngOnInit() {

  }

}
