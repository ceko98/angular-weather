import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherEditDialogComponent } from './weather-edit-dialog.component';

describe('WeatherEditDialogComponent', () => {
  let component: WeatherEditDialogComponent;
  let fixture: ComponentFixture<WeatherEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
