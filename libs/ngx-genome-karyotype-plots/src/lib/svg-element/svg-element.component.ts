import {Component, Input, OnInit} from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'haploqa-modules-svg-element',
  templateUrl: './svg-element.component.html',
  styleUrls: ['./svg-element.component.scss']
})
export class SvgElementComponent implements OnInit {

  // TODO: Fix these types
  public svg!: any;
  public plot: any;
  public plotContentsGroup: any
  public axesGroup: any;
  public yAxisIds: any;
  public xAxisIds: any;

  public chrOrdinalScale: any;

  @Input() name: string = 'SVG Common!';
  @Input() width: number = 900;
  @Input() height: number = 900;
  @Input() margin: number = 50;
  @Input() intervalMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#hapkaryoplot")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    this.plot = this.svg
      .append("g")
      .attr("class", "plot")
      .attr("transform", "translate(0, 15)");
    this.plotContentsGroup = this.plot
      .append("g")
      .attr("class", "plot-contents")
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
