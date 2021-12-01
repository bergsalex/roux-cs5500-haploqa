import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenomeKaryotypePlotComponent } from './genome-karyotype-plot/genome-karyotype-plot.component';
import { GenomeIntervalPlotComponent } from './genome-interval-plot/genome-interval-plot.component';
import { SvgElementComponent } from './svg-element/svg-element.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    GenomeKaryotypePlotComponent,
    GenomeIntervalPlotComponent,
    SvgElementComponent
  ],
  exports: [
    GenomeKaryotypePlotComponent,
    GenomeIntervalPlotComponent
  ],
})
export class NgxGenomeKaryotypePlotsModule {}
