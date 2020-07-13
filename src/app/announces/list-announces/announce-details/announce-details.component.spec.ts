import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceDetailsComponent } from './announce-details.component';

describe('AnnounceDetailsComponent', () => {
  let component: AnnounceDetailsComponent;
  let fixture: ComponentFixture<AnnounceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
