import {
  Component,
  Input,
  Output,
  TemplateRef,
  EventEmitter,
  OnInit,
  ElementRef,
  OnDestroy,
  HostListener
} from "@angular/core";
import { fromEvent, Subject, merge } from "rxjs";
import {
  filter,
  take,
  switchMapTo,
  takeUntil,
  map,
  throttleTime
} from "rxjs/operators";

@Component({
  selector: "app-editable",
  templateUrl: "./editable.component.html",
  styleUrls: ["./editable.component.css"]
})
export class EditableComponent implements OnInit, OnDestroy {
  @Input() viewModeTemplate: TemplateRef<any>;
  @Input() editModeTemplate: TemplateRef<any>;

  @Output() update = new EventEmitter();

  mode: "view" | "edit" = "view";

  private unsubscribe$ = new Subject();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.editModeHandler();
  }

  private get element() {
    return this.el.nativeElement;
  }

  // @HostListener('document:click', ['$event'])
  editModeHandler() {
    merge(
      fromEvent(this.element, "click").pipe(map(() => false)),
      fromEvent(document.body, "click").pipe(map(() => true))
    )
      .pipe(takeUntil(this.unsubscribe$), throttleTime(0))
      .subscribe(toToggle => {
        if (toToggle) {
          this.mode = "view";
        }
      });
  }

  toggleMode(mode?: "view" | "edit") {
    if (mode) {
      this.mode = mode;
    } else if (this.mode === "edit") {
      this.mode = "view";
      this.update.next();
    } else {
      this.mode = "edit";
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
