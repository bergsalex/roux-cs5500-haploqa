import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import * as d3 from "d3";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export type D3Selection = d3.Selection<HTMLElement, {}, null, undefined>;
export type D3SvggElement = d3.Selection<SVGGElement, any, null, undefined>;


export interface MousePositionInfo {
  x: number,
  y: number
}

@Component({
  selector: 'haploqa-modules-svg-element',
  templateUrl: './svg-element.component.html',
  styleUrls: ['./svg-element.component.scss']
})
export class SvgElementComponent implements AfterViewInit {

  // TODO: Fix these types
  public svg!: any;
  public plot!: D3Selection;
  public plotContentsGroup!: D3Selection;
  public axes!: D3Selection;
  public plotLegend!: D3Selection;
  public snpBar!: D3Selection;

  @Input() name = 'SVG Common!';
  @Input() width = 900;
  @Input() height = 960;
  @Input() margin = 50;
  @Input() intervalMode = false;

  @ViewChild('svgElem') public svgElem!: ElementRef<HTMLElement>;
  @ViewChild('plotElem') public plotElem!: ElementRef<HTMLElement>;
  @ViewChild('plotContentsGroupElem') public plotContentsElem!: ElementRef<HTMLElement>;
  @ViewChild('plotLegendElem') public plotLegendElem!: ElementRef<HTMLElement>;
  @ViewChild('axesElem') public axesElem!: ElementRef<HTMLElement>;
  @ViewChild('snpBarsElem') public snpBarsElem!: ElementRef<HTMLElement>;

  @Output() svgClick = new EventEmitter<MousePositionInfo>();
  @Output() svgMouseDown = new EventEmitter<MousePositionInfo>();
  @Output() svgMouseMove = new EventEmitter<MousePositionInfo>();
  @Output() svgMouseUp = new EventEmitter<MousePositionInfo>();

  ngAfterViewInit() {
    this.svg = d3.select(this.svgElem.nativeElement);
    this.plot = d3.select(this.plotElem.nativeElement);
    this.plotContentsGroup = d3.select(this.plotContentsElem.nativeElement);
    this.plotLegend = d3.select(this.plotLegendElem.nativeElement);
    this.axes = d3.select(this.axesElem.nativeElement);
    this.snpBar = d3.select(this.snpBarsElem.nativeElement);
  }

  public mousePositionInfo($event: MouseEvent): MousePositionInfo {
    const mouseXY = d3.pointer($event);
    // TODO: Check why the commented code (legacy) fails in typescript
    // let x = mouseXY[0] - self.radius;
    // let y = mouseXY[1] - self.radius;
    const x = mouseXY[0]
    const y = mouseXY[1];
    console.log(mouseXY)

    return {x: x, y: y};
  };

  emitClick($event: MouseEvent) {
    this.svgClick.emit(this.mousePositionInfo($event))
  }

  emitMouseDown() {
    // this.svgMouseDown.emit(this.mousePositionInfo())
  }

  emitMouseMove() {
    // this.svgMouseMove.emit(this.mousePositionInfo())
  }

  emitMouseUp() {
    // this.svgMouseUp.emit(this.mousePositionInfo())
  }
}
