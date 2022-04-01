import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCarsListComponent } from './my-cars-list.component';

describe('MyCarsListComponent', () => {
  let component: MyCarsListComponent;
  let fixture: ComponentFixture<MyCarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
