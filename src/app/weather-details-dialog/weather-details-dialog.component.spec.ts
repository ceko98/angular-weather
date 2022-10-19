import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsDialogComponent } from './weather-details-dialog.component';

describe('WeatherDetailsDialogComponent', () => {
  let component: WeatherDetailsDialogComponent;
  let fixture: ComponentFixture<WeatherDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
