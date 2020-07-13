import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceImagesComponent } from './announce-images.component';

describe('AnnounceImagesComponent', () => {
  let component: AnnounceImagesComponent;
  let fixture: ComponentFixture<AnnounceImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounceImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
