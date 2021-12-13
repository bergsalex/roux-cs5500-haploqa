import {Injectable, Input} from "@angular/core";
import { DataCacheService } from "./data-cache.service";
import {SvgElementComponent, D3SvggElement} from "./svg-element/svg-element.component";
import * as d3 from "d3";


export interface ChrInterval {
  size: number,
  chr: string,
  startPos: number,
  endPos: number
}

@Injectable({
  providedIn: 'root'
})
export class ZoomIntervalService {

  private static defaultInterval: ChrInterval = {
    chr: "1",
    startPos: 0,
    endPos: 10000000,
    size: 10000000
  }

  // TODO: Fix these types
  // private svgComp!: SvgElementComponent;
  public initZoomWidthBp = 10000000 - 1;
  private _zoomInterval!: ChrInterval;
  // private _zoomOverlayGroup!: any
  private _zoomIntervalChange = false;

  // private _refIntervalMovingX!: number;
  private _zoomInitStartBp!: number;
  private _zoomInitWidthBp!: number;

  @Input() intervalMode = false;

  constructor(private dataCache: DataCacheService) {
    this.dataCache.zoomInterval(ZoomIntervalService.defaultInterval);
  }

  private static zoomOverlayGroup(svgComp: SvgElementComponent): D3SvggElement {
    return svgComp.svg.append("g").attr("class", "zoom-overlay");
  }

  public intervalIsSet(): boolean {
    return typeof this._zoomInterval !== 'undefined';
  }

  public zoomInterval(svgComp: SvgElementComponent, newZoomInterval?: ChrInterval): ChrInterval {
    const _zoomOverlayGroup = ZoomIntervalService.zoomOverlayGroup(svgComp);
    this._zoomInterval = this.dataCache.zoomInterval(newZoomInterval);
    this._zoomInitStartBp = this._zoomInterval.startPos;
    this._zoomInitWidthBp = this._zoomInterval.size;
    if(!this.intervalMode) {
      _zoomOverlayGroup.selectAll("*").remove();
    }

    return this._zoomInterval;
  }

  public addIntervalModeZoom(svgComp: SvgElementComponent): void {
    const zoom = d3.zoom()
    svgComp.svg.call(zoom);
    zoom.on('zoomstart', () => {
      if(this._zoomInterval !== null) {
        this._zoomInitStartBp = this._zoomInterval.startPos;
        this._zoomInitWidthBp = this._zoomInterval.size;
      }
    });
    zoom.on('zoom', () => {
      if(this._zoomInterval !== null) {
        // TODO: This reference to `d3.event` is broken
        // let newIntervalSize = Math.round(this._zoomInitWidthBp / d3.event.scale);
        // TODO: Replace filler code below with rewritten code from above
        const newIntervalSize = 0;
        if(newIntervalSize !== this._zoomInterval.size) {
          this._zoomInterval.size = newIntervalSize;
          const growthBp = newIntervalSize - this._zoomInitWidthBp;
          this._zoomInterval.startPos = this._zoomInitStartBp - Math.round(growthBp / 2);
          // TODO what about this - 1. Do we need it?
          this._zoomInterval.endPos = this._zoomInterval.startPos + this._zoomInterval.size - 1;

          // TODO: Maybe emit something instead of this legacy code?
          // See `src/haploqa/templates/sample.html, updateInterval(), line 327 in hte legacy code for an implementation
          // of a zoomIntervalChange method.
          // self.zoomIntervalChange(this._zoomInterval);

        }
      }
    });
    zoom.on('zoomend', () => {
      zoom.scaleTo(svgComp.svg, 1);
    });
  }

}
