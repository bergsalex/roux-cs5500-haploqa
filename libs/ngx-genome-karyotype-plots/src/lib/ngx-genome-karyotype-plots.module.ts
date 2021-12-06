import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenomeKaryotypePlotComponent } from './genome-karyotype-plot/genome-karyotype-plot.component';
import { GenomeIntervalPlotComponent } from './genome-interval-plot/genome-interval-plot.component';
import { SvgElementComponent } from './svg-element/svg-element.component';
import { PlotContainerComponent } from './plot-container/plot-container.component';
import { HaplotypesPanelComponent } from './haplotypes-panel/haplotypes-panel.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    GenomeKaryotypePlotComponent,
    GenomeIntervalPlotComponent,
    SvgElementComponent,
    PlotContainerComponent,
    HaplotypesPanelComponent,
  ],
  exports: [
    GenomeKaryotypePlotComponent,
    GenomeIntervalPlotComponent,
    PlotContainerComponent,
    HaplotypesPanelComponent,
  ],
})
export class NgxGenomeKaryotypePlotsModule {}
