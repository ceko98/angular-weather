import { Injectable } from '@angular/core';
import { isNil } from 'lodash';

interface WeatherLocation {
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
    console.log(locations);
    
    this.locations = isNil(locations) ? [] : JSON.parse(locations);
  }
  
  saveLocations() {
    const serializedLocations = JSON.stringify(this.locations);
    window.localStorage.setItem(this.LOCATIONS_KEY, serializedLocations);
  }

  get savedLocations(): WeatherLocation[] {
    return [...this.locations];
  }

  addLocation(location: WeatherLocation) {
    this.locations.push(location);
  }
}
