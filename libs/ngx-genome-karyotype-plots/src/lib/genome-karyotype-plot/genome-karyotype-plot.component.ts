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

  @Input() name = 'Genome Karyotype Plot';
  @Input() width = 900;
  @Input() height = 960;
  @Input() margin = 50;
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
    if (typeof this.sample !== 'undefined') {
      // NOTE: We need to do this SVG initialization after view init since the SVG is a subcomponent
      // and doesn't exist until then.
      this.svgTools.init();
      this.svgTools.updateAxes(this.svgComponent);
      // TODO: Check usage of this
      this.svgTools.drawNoDataOverlay(this.svgComponent, 'Loading Data', 30);
      this.svgTools.drawLegend(this.svgComponent, this.sample.contributing_strains, 900);
      this.svgTools.updateHaplotypes(this.svgComponent, this.haploData);
    }
  }

  public handleClick(pos: MousePositionInfo): void {
    let chr = '';
    const x = pos.x;
    // TODO: We clearly need this line, but why do we subtract 15?? Where did we get that number?
    const y = pos.y - 15;
    // let y = pos.y;
    const bpPos = this.svgTools.genomeScale.invert(x);
    const ordinalHeight = this.svgTools.chrOrdinalScale.bandwidth();
    for (const id of this.svgTools.yAxisIDs) {
      const currY = this.svgTools.chrOrdinalScale(id);
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
