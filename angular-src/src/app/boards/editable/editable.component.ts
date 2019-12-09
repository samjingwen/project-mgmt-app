import {
  Component,
  Input,
  Output,
  TemplateRef,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-editable",
  templateUrl: "./editable.component.html",
  styleUrls: ["./editable.component.css"]
})
export class EditableComponent {
  @Input() viewModeTemplate: TemplateRef<any>;
  @Input() editModeTemplate: TemplateRef<any>;

  @Output() update = new EventEmitter();

  mode: "view" | "edit" = "view";

  toggleMode() {
    if (this.mode === "edit") {
      this.mode = "view";
      this.update.next();
    } else {
      this.mode = "edit";
    }
  }
}
