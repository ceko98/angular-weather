import { Component } from '@angular/core';
import { isNil } from 'lodash';
import { WeatherStorageService } from '../weather-storage/weather-storage.service';

@Component({
  selector: 'app-weather-cards',
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.sass']
})
export class WeatherCardsComponent {
  longitude: number | null = null;
  latitude: number | null = null;

  constructor(private weatherStorageService: WeatherStorageService) { }

  get locations() {
    return this.weatherStorageService.weatherLocations;
  }

  addLocation() {
    if (isNil(this.longitude) || isNil(this.latitude)) {
      return;
    }
    
    this.weatherStorageService
      .addLocation({longitude: this.longitude, latitude: this.latitude})
  }  

}
