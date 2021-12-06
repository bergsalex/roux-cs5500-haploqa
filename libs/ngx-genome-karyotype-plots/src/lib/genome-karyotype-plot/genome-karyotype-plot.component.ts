import {Component, Input, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {ChrIdsService} from "../chr-ids.service";
import {MousePositionInfo, SvgElementComponent} from "../svg-element/svg-element.component";
import {SvgToolsService} from "../svg-tools.service";
import {ChrInterval, ZoomIntervalService} from "../zoom-interval.service";
import {StrainMapService, StrainMap} from "../strain-map.service";

@Component({
  selector: 'ngx-genome-karyotype-plot',
  templateUrl: './genome-karyotype-plot.component.html',
  styleUrls: ['./genome-karyotype-plot.component.scss'],
  providers: [SvgToolsService]
})
export class GenomeKaryotypePlotComponent implements AfterViewInit {

  @Input() name: string = 'Genome Karyotype Plot';
  @Input() width: number = 900;
  @Input() height: number = 960;
  @Input() margin: number = 50;
  @Input() sample: any;
  @Input() haploData: any;

  @Output() mouseClick = new EventEmitter<ChrInterval>();

  // TODO: Implement download buttons

  @ViewChild(SvgElementComponent)
  private svgComponent!: SvgElementComponent;

  constructor(private chrIdsSvc: ChrIdsService,
              private strainSvc: StrainMapService,
              private zoomTools: ZoomIntervalService,
              private svgTools: SvgToolsService) { }

  get strainMap(): StrainMap {
    return this.strainSvc.strainMap;
  }

  ngAfterViewInit(): void {
    // NOTE: We need to do this SVG initialization after view init since the SVG is a subcomponent
    // and doesn't exist until then.
    this.svgTools.init();
    this.svgTools.updateAxes(this.svgComponent);
    // TODO: Check usage of this
    this.svgTools.drawNoDataOverlay(this.svgComponent, 'Loading Data', 30);
    this.svgTools.drawLegend(this.svgComponent, this.sample.contributing_strains, 900);
    this.svgTools.updateHaplotypes(this.svgComponent, this.haploData);
  }

  public handleClick(pos: MousePositionInfo): void {
    let chr = '';
    let x = pos.x;
    // TODO: We clearly need this line, but why do we subtract 15?? Where did we get that number?
    let y = pos.y - 15;
    // let y = pos.y;
    let bpPos = this.svgTools.genomeScale.invert(x);
    let ordinalHeight = this.svgTools.chrOrdinalScale.bandwidth();
    for (let id of this.svgTools.yAxisIDs) {
      let currY = this.svgTools.chrOrdinalScale(id);
      if (y >= currY && y <= currY + ordinalHeight) {
        chr = id;
      }
    }

    if (chr !== '') {
      const prevInterval = this.zoomTools.zoomInterval(this.svgComponent);
      const newInterval: ChrInterval = {
        size: prevInterval.size,
        chr: chr,
        startPos: Math.round(bpPos - prevInterval.size / 2.0),
        endPos: prevInterval.startPos + prevInterval.size - 1
      }
      this.mouseClick.emit(newInterval);
      this.zoomTools.zoomInterval(this.svgComponent, newInterval);
    }
  }
}
