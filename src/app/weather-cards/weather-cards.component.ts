import { Component, HostListener } from '@angular/core';
import { isNil } from 'lodash';
import { combineLatest, take } from 'rxjs';
import { WeatherApiService, WeatherResult } from '../weather-api/weather-api.service';
import { WeatherStorageService } from '../weather-storage/weather-storage.service';

@Component({
  selector: 'app-weather-cards',
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.sass']
})
export class WeatherCardsComponent {
  longitude: number | null = null;
  latitude: number | null = null;

  weatherLocations: WeatherResult[] = [];

  constructor(
    private weatherStorageService: WeatherStorageService,
    private weatherApiService: WeatherApiService,
  ) {
    combineLatest(
      this.weatherStorageService.savedLocations.map(location =>
        this.weatherApiService.fetchLocation(location.latitude, location.longitude))
    ).pipe(take(1))
    .subscribe(locations => this.weatherLocations = locations);
  }

  @HostListener('window:beforeunload')
  saveLocations() {
    this.weatherStorageService.saveLocations();
  }

  addLocation() {
    if (isNil(this.longitude) || isNil(this.latitude)) {
      return;
    }

    this.weatherStorageService.addLocation({ latitude: this.latitude, longitude: this.longitude })
    this.weatherApiService.fetchLocation(this.latitude, this.longitude)
      .subscribe(location => {
        this.weatherLocations.push(location);
      })
  }

}
