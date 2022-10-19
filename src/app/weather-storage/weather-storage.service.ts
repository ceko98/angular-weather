import { Injectable } from '@angular/core';
import { isNil } from 'lodash';

export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherStorageService {
  private readonly LOCATIONS_KEY = 'weatherLocations';
  private locations: WeatherLocation[];

  constructor() {
    const locations = window.localStorage.getItem(this.LOCATIONS_KEY);
    this.locations = isNil(locations) ? [] : JSON.parse(locations);
  }
  
  saveLocations(locations: WeatherLocation[]) {
    const serializedLocations = JSON.stringify(locations);
    window.localStorage.setItem(this.LOCATIONS_KEY, serializedLocations);
  }

  get savedLocations(): WeatherLocation[] {
    return [...this.locations];
  }
}
