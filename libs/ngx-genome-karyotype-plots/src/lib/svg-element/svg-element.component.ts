import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'haploqa-modules-svg-element',
  templateUrl: './svg-element.component.html',
  styleUrls: ['./svg-element.component.scss']
})
export class SvgElementComponent implements AfterViewInit {

  // TODO: Fix these types
  public svg!: any;
  public plot: any;
  public plotContentsGroup: any
  public axesGroup: any;
  public yAxisIds: any;
  public xAxisIds: any;

  public chrOrdinalScale: any;

  public snpBar!: any;

  @Input() name: string = 'SVG Common!';
  @Input() width: number = 900;
  @Input() height: number = 900;
  @Input() margin: number = 50;
  @Input() intervalMode: boolean = false;

  @ViewChild('svgElem') public svgElem!: ElementRef<HTMLElement>;
  @ViewChild('plotElem') public plotElem!: ElementRef<HTMLElement>;
  @ViewChild('plotContentsGroupElem') public plotContentsElem!: ElementRef<HTMLElement>;

  constructor() {}

  ngAfterViewInit() {
    this.svg = d3.select(this.svgElem.nativeElement);
    this.plot = d3.select(this.plotElem.nativeElement);
    this.plotContentsGroup = d3.select(this.plotContentsElem.nativeElement);
  }

  public mousePositionInfo(): {} {
    let mouseXY = d3.pointer(this.svg.node());
    // TODO: Check why the commented code (legacy) fails in typescript
    // let x = mouseXY[0] - self.radius;
    // let y = mouseXY[1] - self.radius;
    let x = mouseXY[0]
    let y = mouseXY[1];

    return {x: x, y: y};
  };

}
