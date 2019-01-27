import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemsPageModule} from './containers/items-page/items-page.module';
import {CoreStoreModule} from './store/core-store.module';

@NgModule({
  imports: [
    CommonModule,
    CoreStoreModule,
    ItemsPageModule
  ],
  exports: [ItemsPageModule]
})
export class CoreModule { }
