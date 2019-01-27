import {Component, OnInit} from '@angular/core';
import {CoreStoreService} from './core/store/core-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private coreStoreService: CoreStoreService
  ) {
  }
  ngOnInit() {
    this.coreStoreService.dispatchGetFilter();
  }
}
