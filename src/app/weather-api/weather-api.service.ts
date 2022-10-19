import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherLocation } from '../weather-storage/weather-storage.service';

interface WeatherApiRes {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
  };
}

export interface WeatherResults extends WeatherApiRes {
  name: string;
}

interface LocationSearchProps {
  formatted: string;
  lat: number;
  lon: number;
}

interface LocationSearchResult {
  features: Array<{ properties: LocationSearchProps }>;
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

  fetchLocation({ latitude, longitude, name }: WeatherLocation): Observable<WeatherResults> {
    const hourly = this.hourlyParams.join(',');
    const daily = this.dailyParams.join(',');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const current_weather = true;

    return this.http.get<WeatherApiRes>(
      this.url,
      { params: { longitude, latitude, hourly, daily, timezone, current_weather } },
    ).pipe(
      map(result => ({ name, ...result }))
    );
  }

  searchLocations(search: string) {
    const url = 'https://api.geoapify.com/v1/geocode/search';
    return this.http.get<LocationSearchResult>(
      url,
      { params: { text: search, apiKey: '2d17f401cbdf46e8aff29cdc627c6d7c' } },
    ).pipe(
      map(({ features }) => {
        return features.map(({ properties }) => ({
          name: properties.formatted,
          latitude: properties.lat,
          longitude: properties.lon,
        }));
      })
    );
  }
}
