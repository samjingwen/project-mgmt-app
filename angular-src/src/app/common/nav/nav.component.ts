import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
  animations: [
    trigger("inOutAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("1s ease-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("0.4s ease-in", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  navOpen: boolean;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 47em)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {}

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
