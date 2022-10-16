import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface WetherApiParams {
  longitude: number;
  latitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly url = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }
  
  addLocation(longitude: number, latitude: number) {
    return this.fetchLocation(longitude, latitude);
  }

  private fetchLocation(longitude: number, latitude: number) {
    return this.http.get<any>(
      this.url,
      { params: { longitude, latitude } },
    );
  }
}
