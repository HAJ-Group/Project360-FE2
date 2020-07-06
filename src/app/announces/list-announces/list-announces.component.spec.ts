import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnouncesComponent } from './list-announces.component';

describe('ListAnnouncesComponent', () => {
  let component: ListAnnouncesComponent;
  let fixture: ComponentFixture<ListAnnouncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAnnouncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnnouncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
