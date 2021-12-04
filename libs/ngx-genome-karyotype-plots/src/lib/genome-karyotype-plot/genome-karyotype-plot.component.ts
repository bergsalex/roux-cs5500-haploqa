import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {ChrIdsService, ChrSize} from "../chr-ids.service";
import {SvgElementComponent} from "../svg-element/svg-element.component";
import {DataCacheService} from "../data-cache.service";
import {SvgToolsService} from "../svg-tools.service";
import {ZoomIntervalService} from "../zoom-interval.service";
import {haploData, strainMap, strainNames, sample} from "../static-data"
import {mm10ChrSizes} from "../mm10-data";

/**
 *
 */
@Component({
  selector: 'ngx-genome-karyotype-plot',
  templateUrl: './genome-karyotype-plot.component.html',
  styleUrls: ['./genome-karyotype-plot.component.scss'],
  providers: [ZoomIntervalService, DataCacheService, ChrIdsService, SvgToolsService]
})
export class GenomeKaryotypePlotComponent implements OnInit, AfterViewInit {

  @Input() name: string = 'Genome Karyotype Plot';
  @Input() width: number = 900;
  @Input() height: number = 960;
  @Input() margin: number = 50;
  @Input() chrSizes: ChrSize[] = mm10ChrSizes;


  // @Input() strainMap: any;
  // @Input() allSds: any;
  // @Input() allTags: any;
  // @Input() allOwners: any;
  // @Input() sample: any;
  // @Input() allEngTgts: any;
  // @Input() haplotypePollingIntervalMillisecs: number = 2500;
  // @Input() comparisonStatus: boolean = true;
  // @ViewChild()
  // TODO: Implement download buttons
  // TODO: Emit click events


  @ViewChild(SvgElementComponent)
  private svgComponent!: SvgElementComponent;

  constructor(private chrIdsSvc: ChrIdsService,
              private svgTools: SvgToolsService,
              private dataCache: DataCacheService,
              private zoomTools: ZoomIntervalService) { }

  ngOnInit(): void {
    this.chrIdsSvc.initChrIds(this.chrSizes);
 }

  ngAfterViewInit(): void {
    // NOTE: Set initZoomWidthBp by setting the public attribute prior to calling init
    // this.zoomTools.initZoomWidthBp = 10;
    this.zoomTools.init(this.svgComponent);

    // NOTE: We need to do this SVG initialization after view init since the SVG is a subcomponent
    // and doesn't exist until then.
    this.svgTools.init(this.svgComponent, strainMap);
    // TODO: Check usage of this
    this.svgTools.drawNoDataOverlay('Loading Data', 30);
    this.svgTools.drawLegend(strainMap, sample.contributing_strains, 900);
    this.svgTools.updateHaplotypes(haploData, strainMap, strainNames, this.chrIdsSvc.chrSizes);
  }
}
