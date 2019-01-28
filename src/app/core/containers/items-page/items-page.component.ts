import { Component, OnInit } from '@angular/core';
import {CoreStoreService} from '../../store/core-store.service';
import {ICategory, ICity, IFilterData, INormalizeData} from '../../models/core.interface';
import {entityData} from '../../store/core.state';

@Component({
  selector: 'items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {

  items: Array<INormalizeData>;
  cities: entityData<ICity>;
  categories: entityData<ICategory>;
  filterSettings: IFilterData;

  loading: boolean;

  constructor(
    private coreStoreService: CoreStoreService,
  ) { }

  ngOnInit() {
    this.coreStoreService.dispatchGetTestData();

    this.coreStoreService.getLoadingDataStatus().subscribe( isLoading => {
      this.loading = isLoading;
    });

    this.coreStoreService.getFilteredData()
      .subscribe(items => {
        this.items = items;
      });

    this.coreStoreService.getCity()
      .subscribe(cities => {
        this.cities = cities;
      });

    this.coreStoreService.getCategory()
      .subscribe( categories => {
        this.categories = categories;
    });

    this.coreStoreService.getFilter().subscribe( filterSettings => {
      this.filterSettings = filterSettings;
    });
  }

  filter(data) {
    this.setFilter(data);
    this.coreStoreService.dispatchFilterData();
  }

  setFilter(data) {
    this.coreStoreService.dispatchSetFilter(data);
  }
}
