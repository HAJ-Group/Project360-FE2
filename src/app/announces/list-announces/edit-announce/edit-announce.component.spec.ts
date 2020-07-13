import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnounceComponent } from './edit-announce.component';

describe('EditAnnounceComponent', () => {
  let component: EditAnnounceComponent;
  let fixture: ComponentFixture<EditAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
