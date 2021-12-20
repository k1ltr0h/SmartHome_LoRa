import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomaComponent } from './rooma.component';

describe('RoomaComponent', () => {
  let component: RoomaComponent;
  let fixture: ComponentFixture<RoomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
