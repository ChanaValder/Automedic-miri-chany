import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMedicineComponent } from './day-medicine.component';

describe('DayMedicineComponent', () => {
  let component: DayMedicineComponent;
  let fixture: ComponentFixture<DayMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
