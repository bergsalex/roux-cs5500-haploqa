import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgxGenomeKaryotypePlotsModule} from "@haploqa-modules/ngx-genome-karyotype-plots";

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxGenomeKaryotypePlotsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
