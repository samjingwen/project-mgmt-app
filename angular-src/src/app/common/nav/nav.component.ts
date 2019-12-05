import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  MediaMatcher,
  BreakpointObserver,
  BreakpointState
} from "@angular/cdk/layout";
import {
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
  animations: [
    trigger("openClose", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("1s ease-out", style({ opacity: 1 }))
      ])
      // transition(":leave", [
      //   style({ opacity: 1 }),
      //   animate("0.4s ease-in", style({ opacity: 0 }))
      // ])
    ])
  ]
})
export class NavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  navOpen: boolean = true;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    breakpointObserver: BreakpointObserver
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 40em)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    breakpointObserver
      .observe(["(max-width: 40em)"])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.navOpen = false;
        } else {
          this.navOpen = true;
        }
      });
  }

  ngOnInit() {}

  toggleNav() {
    if (this.mobileQuery.matches) this.navOpen = !this.navOpen;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
