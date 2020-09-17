import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnnouncesComponent } from './all-announces.component';

describe('AllAnnouncesComponent', () => {
  let component: AllAnnouncesComponent;
  let fixture: ComponentFixture<AllAnnouncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAnnouncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAnnouncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
