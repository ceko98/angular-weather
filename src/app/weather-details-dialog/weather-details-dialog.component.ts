import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherResults } from '../weather-api/weather-api.service';

@Component({
  selector: 'app-weather-details-dialog',
  templateUrl: './weather-details-dialog.component.html',
  styleUrls: ['./weather-details-dialog.component.sass']
})
export class WeatherDetailsDialogComponent implements OnInit {
  readonly displayedColumnsHourly = [
    'time', 'temperature', 'humidity', 'windspeed', 'winddirection',
  ];
  readonly displayedColumnsDaily = ['time', 'sunrise', 'sunset'];

  constructor(@Inject(MAT_DIALOG_DATA) public location: WeatherResults) { }

  ngOnInit(): void {
  }


}
