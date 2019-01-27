import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSectionComponent } from './filter-section.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng5SliderModule} from 'ng5-slider';

@NgModule({
  declarations: [FilterSectionComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng5SliderModule
  ],
  exports: [FilterSectionComponent]
})
export class FilterSectionModule { }
