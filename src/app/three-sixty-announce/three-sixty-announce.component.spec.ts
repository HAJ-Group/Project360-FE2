import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeSixtyAnnounceComponent } from './three-sixty-announce.component';

describe('ThreeSixtyAnnounceComponent', () => {
  let component: ThreeSixtyAnnounceComponent;
  let fixture: ComponentFixture<ThreeSixtyAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeSixtyAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeSixtyAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
