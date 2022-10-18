import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface WeatherResult {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly url = 'https://api.open-meteo.com/v1/forecast';

  private readonly hourlyParams = [
    'temperature_2m',
    'relativehumidity_2m',
    'windspeed_10m',
    'winddirection_10m',
  ] as const;
  private readonly dailyParams = ['sunrise','sunset'] as const;

  constructor(private http: HttpClient) { }

  fetchLocation(latitude: number, longitude: number) {
    const hourly = this.hourlyParams.join(',');
    const daily = this.dailyParams.join(',');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const current_weather = true;

    return this.http.get<WeatherResult>(
      this.url,
      { params: { longitude, latitude, hourly, daily, timezone, current_weather } },
    );
  }
}
