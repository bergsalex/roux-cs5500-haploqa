import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenomeKaryotypePlotComponent } from './genome-karyotype-plot/genome-karyotype-plot.component';
import { GenomeIntervalPlotComponent } from './genome-interval-plot/genome-interval-plot.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    GenomeKaryotypePlotComponent,
    GenomeIntervalPlotComponent
  ],
  exports: [
    GenomeKaryotypePlotComponent,
    GenomeIntervalPlotComponent
  ],
})
export class NgxGenomeKaryotypePlotsModule {}
