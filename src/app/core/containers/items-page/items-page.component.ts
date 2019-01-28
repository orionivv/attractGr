import { Component, OnInit } from '@angular/core';
import {CoreStoreService} from '../../store/core-store.service';
import {ICategory, ICity, IFilterData, INormalizeData} from '../../models/core.interface';
import {entityData} from '../../store/core.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {

  items: Array<INormalizeData>;
  cities$: Observable<entityData<ICity>>;
  categories$: Observable<entityData<ICategory>>;
  filterSettings$: Observable<IFilterData>;

  loading: boolean;

  constructor(
    private coreStoreService: CoreStoreService,
  ) { }

  ngOnInit() {
    this.coreStoreService.dispatchGetTestData();

    this.coreStoreService.getLoadingDataStatus()
      .subscribe( isLoading => {
        this.loading = isLoading;
    });

    this.coreStoreService.getFilteredData()
      .subscribe(items => {
        this.items = items;
      });

    this.cities$ = this.coreStoreService.getCity();

    this.categories$ = this.coreStoreService.getCategory();

    this.filterSettings$ = this.coreStoreService.getFilter();
  }

  filter(data) {
    this.setFilter(data);
    this.coreStoreService.dispatchFilterData();
  }

  setFilter(data) {
    this.coreStoreService.dispatchSetFilter(data);
  }
}
