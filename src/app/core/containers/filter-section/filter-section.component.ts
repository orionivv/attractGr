import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ICategory, ICity} from '../../models/core.interface';
import {Options} from 'ng5-slider';

@Component({
  selector: 'filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['filter-section.component.scss']
})
export class FilterSectionComponent implements OnInit, OnChanges{

  cityControl: FormControl;
  filterForm: FormGroup;

  priceHighValue = 150;
  priceValue = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };


  @Input() cities: Array<ICity>;
  @Input() categories: Array<ICategory>;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.filterForm = this.formBuilder.group({
      cityControl: [this.cities[0]],
      categoryControl: []
    });


    this.filterForm.valueChanges.subscribe(val => {
      console.log('---', val);
      // if (val.categories) {
      //   const selectedCategoriesIds = this.filterForm.value.categories
      //     .map((v, i) => v ? this.categories[i].id : null)
      //     .filter(v => v !== null);
      // }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories.currentValue) {
      this.filterForm.removeControl('categoryControl');
      this.filterForm.addControl('categoryControl', new FormArray(this.categories.map(c => new FormControl(false))));
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  filtered() {
    console.log('ss', this.getFilterData());
  }

  changeV(){}

  getFilterData() {
    console.log('---', this.filterForm.value.categoryControl)
    return {
      city: this.filterForm.value.cityControl.id,
      categories:  this.filterForm.value.categoryControl
        .map((v, i) => v ? this.categories[i].id : null)
        .filter(v => v !== null),
      minPrice: this.priceValue,
      maxPrice: this.priceHighValue
    }
  }
}
