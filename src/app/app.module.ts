import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    applicationRef: ApplicationRef
  ) {

    const originalTick = applicationRef.tick;
    applicationRef.tick = function(): any {
      console.log('TICK');

      // const windowPerfomance = window.performance;
      // const before = windowPerfomance.now();
      // tslint:disable-next-line:no-invalid-this
      const retValue = originalTick.apply(this, arguments);
      // const after = windowPerfomance.now();
      // const runTime = after - before;
      // window.console.log('CHANGE DETECTION TIME' , runTime);
      return retValue;
    };
  }
}

