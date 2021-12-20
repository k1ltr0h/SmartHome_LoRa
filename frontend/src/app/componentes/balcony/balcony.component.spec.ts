import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalconyComponent } from './balcony.component';

describe('BalconyComponent', () => {
  let component: BalconyComponent;
  let fixture: ComponentFixture<BalconyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalconyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalconyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
