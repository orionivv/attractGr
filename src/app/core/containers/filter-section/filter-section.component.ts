import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ICategory, ICity, IFilterData} from '../../models/core.interface';
import {Options} from 'ng5-slider';
import {entityData} from '../../store/core.state';

@Component({
  selector: 'filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['filter-section.component.scss']
})
export class FilterSectionComponent implements OnInit, OnChanges {

  cityControl: FormControl;
  filterForm: FormGroup;
  timeout: number;

  priceValue: number;
  priceHighValue: number;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  notChosen = {
   id: 0,
   name: 'Not chosen'
  };

  @Input() cities: entityData<ICity>;
  @Input() categories: entityData<ICategory>;
  @Input() filterSettings: IFilterData;
  @Output() filter = new EventEmitter<any>();
  @Output() setFilter = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.priceValue = this.filterSettings.minPrice;
    this.priceHighValue = this.filterSettings.maxPrice;

    this.filterForm = this.formBuilder.group({
      cityControl: [],
      categoryControl: []
    });

    this.filterForm.valueChanges.subscribe(val => {
      if ( val.categoryControl && val.cityControl) {
        this.changedFilter();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories && changes.categories.currentValue && !changes.categories.previousValue) {
      this.filterForm.setControl('categoryControl', new FormArray(this.categories.ids.map(c =>
        new FormControl(this.filterSettings.categories.includes(Number(c)))
      )));
    }
    if (changes.cities && changes.cities.currentValue && !changes.cities.previousValue) {
      const city = this.filterSettings.city ? this.cities.entities[this.filterSettings.city] : this.notChosen;
      this.filterForm.setControl('cityControl', new FormControl(city));
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  filtered() {
    this.filter.emit(this.getFilterData());
  }

  changeRangeSlider() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.changedFilter.bind(this), 500);
  }

  changedFilter() {
    this.setFilter.emit(this.getFilterData());
  }

  getFilterData() {
    return {
      city: this.filterForm.value.cityControl.id,
      categories:  this.filterForm.value.categoryControl
        .map((v, i) => v ? this.categories.entities[this.categories.ids[i]].id : null)
        .filter(v => v !== null),
      minPrice: this.priceValue,
      maxPrice: this.priceHighValue
    };
  }
}
