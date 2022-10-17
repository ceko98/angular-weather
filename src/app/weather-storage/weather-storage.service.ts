import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { isNil } from 'lodash';

interface WeatherResult {

}

interface WeatherLocation {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherStorageService implements OnDestroy {
  private readonly LOCATIONS_KEY = 'weatherLocations';
  private readonly url = 'https://api.open-meteo.com/v1/forecast';

  private readonly hourlyParams = [
    'temperature_2m',
    'relativehumidity_2m',
    'windspeed_10m',
    'winddirection_10m',
  ] as const;
  private readonly dailyParams = ['sunrise','sunset'] as const;

  weatherLocations: any[] = [];

  constructor(private http: HttpClient) {
    const locations = window.localStorage.getItem(this.LOCATIONS_KEY);
    if (!isNil(locations)) {
      this.weatherLocations = JSON.parse(locations);
    }
  }

  ngOnDestroy() {
    const serializedLocations = JSON.stringify(this.weatherLocations);
    window.localStorage.setItem(this.LOCATIONS_KEY, serializedLocations);
  }
  
  addLocation(location: WeatherLocation) {
    this.fetchLocation(location).subscribe(loc => this.weatherLocations.push(loc));
  }

  private fetchLocation({ longitude, latitude }: WeatherLocation) {
    const hourly = this.hourlyParams.join(',');
    const daily = this.dailyParams.join(',');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const current_weather = true;

    return this.http.get<any>(
      this.url,
      { params: { longitude, latitude, hourly, daily, timezone, current_weather } },
    );
  }
}
