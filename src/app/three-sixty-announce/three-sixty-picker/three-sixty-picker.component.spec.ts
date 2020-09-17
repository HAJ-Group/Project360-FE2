import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeSixtyPickerComponent } from './three-sixty-picker.component';

describe('ThreeSixtyPickerComponent', () => {
  let component: ThreeSixtyPickerComponent;
  let fixture: ComponentFixture<ThreeSixtyPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeSixtyPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeSixtyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
