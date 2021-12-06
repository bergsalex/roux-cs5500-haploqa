import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import * as d3 from "d3";

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
  public plot: any;
  public plotContentsGroup!: any
  public axes!: any;
  public plotLegend!: any;
  public snpBar!: any;

  @Input() name: string = 'SVG Common!';
  @Input() width: number = 900;
  @Input() height: number = 960;
  @Input() margin: number = 50;
  @Input() intervalMode: boolean = false;

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

  constructor() {}

  ngAfterViewInit() {
    this.svg = d3.select(this.svgElem.nativeElement);
    this.plot = d3.select(this.plotElem.nativeElement);
    this.plotContentsGroup = d3.select(this.plotContentsElem.nativeElement);
    this.plotLegend = d3.select(this.plotLegendElem.nativeElement);
    this.axes = d3.select(this.axesElem.nativeElement);
    this.snpBar = d3.select(this.snpBarsElem.nativeElement);
  }

  public mousePositionInfo($event: MouseEvent): MousePositionInfo {
    let mouseXY = d3.pointer($event);
    // TODO: Check why the commented code (legacy) fails in typescript
    // let x = mouseXY[0] - self.radius;
    // let y = mouseXY[1] - self.radius;
    let x = mouseXY[0]
    let y = mouseXY[1];
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
