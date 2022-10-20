import { Component, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherResults } from '../weather-api/weather-api.service';

@Component({
  selector: 'app-weather-edit-dialog',
  templateUrl: './weather-edit-dialog.component.html',
  styleUrls: ['./weather-edit-dialog.component.sass']
})
export class WeatherEditDialogComponent {

  locationForm = new UntypedFormGroup({
    latitude: new UntypedFormControl(null, Validators.required),
    longitude: new UntypedFormControl(null, Validators.required),
    name: new UntypedFormControl(null, Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public location: WeatherResults) {
    this.locationForm.patchValue(location);
  }
}
