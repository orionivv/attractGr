import { NgModule } from '@angular/core';
import { ItemsPageComponent } from './items-page.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterSectionModule} from '../filter-section/filter-section.module';
import {CardModule} from '../../components/card/card.module';
import {LoaderModule} from '../../../shared/components/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FilterSectionModule,
    CardModule,
    LoaderModule
  ],
  declarations: [ItemsPageComponent],
  exports: [ItemsPageComponent]
})
export class ItemsPageModule { }
