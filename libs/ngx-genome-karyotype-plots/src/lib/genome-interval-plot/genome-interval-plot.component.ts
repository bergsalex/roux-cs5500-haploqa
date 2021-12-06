import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChrIdsService, ChrSize} from "../chr-ids.service";
import {StrainMapService} from "../strain-map.service";
import {SvgToolsService} from "../svg-tools.service";
import {mm10ChrSizes} from "@haploqa-modules/ngx-genome-karyotype-plots";
import {SvgElementComponent} from "../svg-element/svg-element.component";

@Component({
  selector: 'ngx-genome-interval-plot',
  templateUrl: './genome-interval-plot.component.html',
  styleUrls: ['./genome-interval-plot.component.scss'],
  providers: [SvgToolsService]
})
export class GenomeIntervalPlotComponent implements OnInit, AfterViewInit {

  @Input() name: string = 'Genome Interval Plot';
  @Input() width: number = 900;
  @Input() height: number = 200;
  @Input() margin: number = 50;
  @Input() chrSizes: ChrSize[] = mm10ChrSizes;

  @Input() strainMap: any = {};
  @Input() sample: any;
  @Input() haploData: any;
  @Input() snpData: any;

  @ViewChild(SvgElementComponent)
  private svgComponent!: SvgElementComponent

  constructor(private chrIdsSvc: ChrIdsService,
              private strainSvc: StrainMapService,
              private svgTools: SvgToolsService) { }

  ngOnInit(): void {
    this.strainSvc.strainMap = this.strainMap;
    this.chrIdsSvc.initChrIds(this.chrSizes)
  }

  ngAfterViewInit() {
    if (typeof this.sample !== 'undefined') {
      this.svgTools.init(true);
      this.svgTools.updateAxes(this.svgComponent);
      // TODO: Check usage of this
      this.svgTools.updateHaplotypes(this.svgComponent, this.haploData);
      this.svgTools.drawLegend(this.svgComponent, this.sample.contributing_strains, 0);
      this.svgTools.updateSNPBar(this.svgComponent, this.snpData);
    }
  }

}
