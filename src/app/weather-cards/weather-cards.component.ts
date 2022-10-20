import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, debounceTime, filter, map, Observable, of, repeat, Subject, switchMap, take, takeUntil } from 'rxjs';
import { WeatherApiService, WeatherResults } from '../weather-api/weather-api.service';
import { WeatherDetailsDialogComponent } from '../weather-details-dialog/weather-details-dialog.component';
import { WeatherLocation, WeatherStorageService } from '../weather-storage/weather-storage.service';

@Component({
  selector: 'app-weather-cards',
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.sass']
})
export class WeatherCardsComponent implements OnDestroy {
  private readonly REFRESH_DELAY = 1000 * 60 * 60;

  locationForm = new UntypedFormGroup({
    latitude: new UntypedFormControl(null, Validators.required),
    longitude: new UntypedFormControl(null, Validators.required),
    name: new UntypedFormControl(null, Validators.required),
  });

  locationSearchForm = new FormControl();
  locationsSearched$: Observable<WeatherLocation[]>;

  weatherLocations: WeatherResults[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private weatherStorageService: WeatherStorageService,
    private weatherApiService: WeatherApiService,
    private dialog: MatDialog,
  ) {
    combineLatest(
      this.weatherStorageService.savedLocations.map(location =>
        this.weatherApiService.fetchLocation(location))
    ).pipe(take(1))
    .subscribe(locations => this.weatherLocations = locations);

    this.locationsSearched$ = this.locationSearchForm.valueChanges
      .pipe(
        debounceTime(500),
        filter(value => !!value),
        switchMap(search => this.weatherApiService.searchLocations(search))
      );

    of([]).pipe(
      map(() => this.weatherLocations.map(
        ({ name, latitude, longitude }) => ({ name, latitude, longitude })
      )),
      switchMap(locations => {
        return combineLatest(locations.map(l => this.weatherApiService.fetchLocation(l)));
      }),
      repeat({ delay: this.REFRESH_DELAY }),
      takeUntil(this.unsubscribe$),
    ).subscribe(newLocations => this.weatherLocations = newLocations);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('window:beforeunload')
  saveLocations() {
    const locationsToSave = this.weatherLocations
      .map(({ name, latitude, longitude }) => ({ name, latitude, longitude }));
    this.weatherStorageService.saveLocations(locationsToSave);
  }
  
  onSearchSelect(location: WeatherLocation) {
    this.locationForm.patchValue(location);
  }

  addLocation() {
    if (this.locationForm.invalid || this.locationExists(this.locationForm.value)) {
      return;
    }

    this.weatherApiService.fetchLocation(this.locationForm.value)
      .subscribe(location => {
        this.weatherLocations.push(location);
      });
  }

  removeLocation(location: WeatherResults) {
    this.weatherLocations = this.weatherLocations.filter(l => !this.areLocationsEqual(location, l));
  }

  openDetailsDialog(location: WeatherResults) {
    this.dialog.open(
      WeatherDetailsDialogComponent,
      { data: location },
    )
  }

  private areLocationsEqual(l1: WeatherLocation, l2: WeatherLocation) {
    return l1.name === l2.name;
  }

  private locationExists(location: WeatherLocation) {
    return !!this.weatherLocations.find(l => this.areLocationsEqual(location, l));
  }
}
