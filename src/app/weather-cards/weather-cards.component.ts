import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { isNil } from 'lodash';
import { WeatherApiService } from '../weather-api/weather-api.service';

@Component({
  selector: 'app-weather-cards',
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.sass']
})
export class WeatherCardsComponent implements OnInit {

  longitude: number | null = null;
  latitude: number | null = null;
  constructor(
    private http: HttpClient,
    private weatherApiService: WeatherApiService,
  ) { }

  ngOnInit() {
  }

  requestOpenStreet() {
    const url = `https://www.openstreetmap.org/geocoder/search_geonames?query=sofia`;
    const url2 = `https://api.open-meteo.com/v1/forecast?latitude=42.66&longitude=23.32`
    this.http.get<any>(url2, {
    })
    .subscribe(val => console.log(val))
  }

  addLocation() {
    if (isNil(this.longitude) || isNil(this.latitude)) {
      return;
    }

    this.weatherApiService.addLocation(this.longitude, this.latitude)
      .subscribe(console.log)
  }  

}
