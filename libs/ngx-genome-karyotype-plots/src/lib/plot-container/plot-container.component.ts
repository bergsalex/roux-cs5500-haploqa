import {Component, Input, OnInit} from '@angular/core';
import { ZoomIntervalService } from "../zoom-interval.service";
import {ChrIdsService, ChrSize} from "../chr-ids.service";
import {StrainMapService} from "../strain-map.service";
import {DataCacheService} from "../data-cache.service";
import {StrainMap} from "../strain-map.service";
import {mm10ChrSizes} from "../example-data/mm10-data"

@Component({
  selector: 'ngx-genome-plot-container',
  templateUrl: './plot-container.component.html',
  styleUrls: ['./plot-container.component.scss'],
  providers: [
    ZoomIntervalService,
    StrainMapService,
    ChrIdsService,
    DataCacheService
  ]
})
export class PlotContainerComponent implements OnInit {

  @Input() chrSizes: ChrSize[] = mm10ChrSizes;
  @Input() strainMap: StrainMap = {};

  constructor(private chrIdsSvc: ChrIdsService,
              private strainSvc: StrainMapService) { }

  ngOnInit(): void {
    this.strainSvc.strainMap = this.strainMap;
    this.chrIdsSvc.chrSizes = this.chrSizes;
  }

}
