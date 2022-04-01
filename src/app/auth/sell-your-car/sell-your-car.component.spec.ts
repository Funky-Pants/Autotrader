import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellYourCarComponent } from './sell-your-car.component';

describe('SellYourCarComponent', () => {
  let component: SellYourCarComponent;
  let fixture: ComponentFixture<SellYourCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellYourCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellYourCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
