import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherApiService } from './weather-api/weather-api.service';
import { WeatherCardsComponent } from './weather-cards/weather-cards.component';
import { WeatherStorageService } from './weather-storage/weather-storage.service';
import { WeatherDetailsDialogComponent } from './weather-details-dialog/weather-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardsComponent,
    WeatherDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    WeatherStorageService,
    WeatherApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
