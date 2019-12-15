import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOwnerComponent } from './select-owner.component';

describe('SelectOwnerComponent', () => {
  let component: SelectOwnerComponent;
  let fixture: ComponentFixture<SelectOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
