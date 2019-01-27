import { Component, OnInit } from '@angular/core';
import {CoreStoreService} from '../../store/core-store.service';
import {ICategory, ICity, IData} from '../../models/core.interface';
import {map} from 'rxjs/operators';

@Component({
  selector: 'items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {

  items: Array<IData>;
  cities: Array<ICity>;
  categories: Array<ICategory>;

  constructor(
    private coreStoreService: CoreStoreService,
  ) { }

  ngOnInit() {
    this.coreStoreService.dispatchGetTestData();

    this.coreStoreService.getNormalizedData()
      .subscribe((items: any) => {
        this.items = items;
      });

    this.coreStoreService.getCity()
      .pipe(
        map(cities => {
          const notChosen = {
            id: 0,
            name: 'Not chosen'
          };
          return !cities ? Array.of(notChosen) : (cities.unshift(notChosen), cities);
        })
      )
      .subscribe(cities => {
        this.cities = cities;
      });

    this.coreStoreService.getCategory()
      .subscribe( categories => {
        this.categories = categories;
    });
  }
}
