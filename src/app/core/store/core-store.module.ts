import { NgModule } from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {CoreStoreService} from './core-store.service';
import {ICoreState} from './core.state';
import {coreDataReducer} from './core.reducer';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CoreEffects} from './core.effects';

const reducers: ActionReducerMap<ICoreState> = {
  core: coreDataReducer
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CoreEffects]),
    StoreDevtoolsModule.instrument()
  ],
  exports: [
    StoreModule,
    EffectsModule,
    StoreDevtoolsModule
  ],
  providers: [CoreStoreService]
})
export class CoreStoreModule { }
