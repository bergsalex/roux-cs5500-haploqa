import { Injectable, Input } from "@angular/core";
import { DataCacheService } from "./data-cache.service";
import * as d3 from "d3";

interface ChrInterval {
  size: number,
  chr: string,
  startPos: number,
  endPos: number
}

@Injectable({
  providedIn: 'root'
})
export class ZoomIntervalService {

  // TODO: Fix these types
  public svg!: any;
  public initZoomWidthBp = 10000000 - 1;
  private _zoomInterval!: ChrInterval;
  private _zoomOverlayGroup!: any
  private _zoomIntervalChange: boolean = false;

  private _refIntervalMovingX!: number;
  private _zoomInitStartBp!: number;
  private _zoomInitWidthBp!: number;

  // TODO: These need to be initialized
  public chrOrdinalScale: any;
  public genomeScale: any

  private static defaultInterval: ChrInterval = {
    chr: "1",
    startPos: 0,
    endPos: 10000000,
    size: 10000000
  }

  @Input() intervalMode: boolean = false;

  constructor(private dataCache: DataCacheService) {
    this.dataCache.zoomInterval(ZoomIntervalService.defaultInterval);
  }

  public init(svg: any, newZoomInterval?: ChrInterval): void {
    this.svg = svg;
    this._zoomOverlayGroup = this.svg.append("g").attr("class", "zoom-overlay");
    this.zoomInterval(newZoomInterval);
  }

  public intervalIsSet(): boolean {
    return typeof this._zoomInterval !== 'undefined';
  }

  public zoomInterval(newZoomInterval?: ChrInterval): ChrInterval {
    this._zoomInterval = this.dataCache.zoomInterval(newZoomInterval);
    this._zoomInitStartBp = this._zoomInterval.startPos;
    this._zoomInitWidthBp = this._zoomInterval.size;
    if(this.intervalMode) {
      // TODO: Emit an event here
      // this.updateHaplotypes();
      // this.updateSNPBar();
    } else {
      this._zoomOverlayGroup.selectAll("*").remove();
    }

    return this._zoomInterval;
  }

  public addIntervalModeZoom(): void {
    let zoom = d3.zoom()
    this.svg.call(zoom);
    zoom.on('zoomstart', () => {
      if(this._zoomInterval !== null) {
        this._zoomInitStartBp = this._zoomInterval.startPos;
        this._zoomInitWidthBp = this._zoomInterval.size;
      }
    });
    zoom.on('zoom', () => {
      if(this._zoomInterval !== null) {
        // TODO: This reference to `d3.event` is broken
        let newIntervalSize = Math.round(this._zoomInitWidthBp / d3.event.scale);
        if(newIntervalSize !== this._zoomInterval.size) {
          this._zoomInterval.size = newIntervalSize;
          let growthBp = newIntervalSize - this._zoomInitWidthBp;
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
      zoom.scaleTo(this.svg, 1);
    });
  }

}
