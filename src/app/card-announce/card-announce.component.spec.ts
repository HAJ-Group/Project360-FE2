import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnnounceComponent } from './card-announce.component';

describe('CardAnnounceComponent', () => {
  let component: CardAnnounceComponent;
  let fixture: ComponentFixture<CardAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
