import {Injectable} from '@angular/core';
import * as d3 from "d3";
// TODO: Figure out what to do about failing d3-tip import
// import d3Tip from "d3-tip";
import {ZoomIntervalService} from "./zoom-interval.service";
import {SvgElementComponent, D3Selection} from "./svg-element/svg-element.component";
import {ChrIdsService} from "./chr-ids.service";
import {DataCacheService} from "./data-cache.service";
import {ChrSize} from "./chr-ids.service";
import {StrainMapService} from "./strain-map.service";

export interface SnpDataItem {
  snp_id: string,
  x_probe_call: string,
  y_probe_call: string,
  haplotype1: string,
  haplotype2: string,
  snp_call?: string,
  allele1_fwd?: string,
  allele2_fwd?: string
}

export type SnpData = Record<number, SnpDataItem>;

export interface SnpBinItem {
  band: number,
  density: number,
  snps: number[]
}

@Injectable({
  providedIn: 'root'
})
export class SvgToolsService {

  public axesGroup!: D3Selection;
  public chrOrdinalScale!: any;
  public genomeScale!: d3.ScaleLinear<number, number, never>;
  public legend!: D3Selection;

  private xAxisSize = 100;
  private yAxisSize = 50;
  private _yAxisIDs: string[] = [];

  private intervalMode = false;

  constructor(private chrIdsSvc: ChrIdsService,
              private strainSvc: StrainMapService,
              private dataCache: DataCacheService,
              private zoomTools: ZoomIntervalService) { }

  public init(intervalMode: boolean = false) {
    // this.svgComp = svgComponent;
    this.intervalMode = intervalMode;
    // this.updateAxes(svgComponent);
  }

  // private initAxes(): void {
  //   this.axesGroup = this.svgComp.plot.append("g").attr("class", "axes");
  //   this.updateAxes();
  // }

  get yAxisIDs(): string[] {
    return this._yAxisIDs;
  }

  public updateAxes(svgComp: SvgElementComponent): void {
    this.axesGroup = svgComp.axes;
    this.axesGroup.selectAll("*").remove();
    // if(this.intervalMode && this.zoomTools.intervalIsSet()) {
    //   return;
    // }

    let startBp: number;
    let endBp: number;
    if(this.intervalMode) {
      const zoomInterval = this.zoomTools.zoomInterval(svgComp);
      startBp = zoomInterval.startPos;
      endBp = zoomInterval.startPos + zoomInterval.size;
      this._yAxisIDs = [zoomInterval.chr];
    } else {
      startBp = this.chrIdsSvc.minStartBp;
      endBp = this.chrIdsSvc.maxEndBp;
      this._yAxisIDs = this.chrIdsSvc.chrIDs;
    }

    this.genomeScale = d3.scaleLinear()
      .domain([startBp, endBp])
      .range([this.yAxisSize, svgComp.width - this.yAxisSize - 2]);
    const genomeAxis = d3.axisBottom<number>(this.genomeScale)
      .tickFormat((x: number) => {return (x / 1000000) + ' Mb';});

    this.axesGroup.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (svgComp.height - this.xAxisSize) + ")")
      .call(genomeAxis);

    this.chrOrdinalScale = d3.scaleBand()
      .domain(this.yAxisIDs)
      .rangeRound([0, svgComp.height - this.xAxisSize])
      .padding(this.intervalMode ? 0.0 : 0.2);
    const yAxis = d3.axisLeft<string>(this.chrOrdinalScale)
      .tickFormat((x: string) => {return 'Chr' + x;})
      .tickPadding(0.2);
    this.axesGroup.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + this.yAxisSize + ",0)")
      .call(yAxis);
  }

  // TODO: Check if xOffset should be a number
  public drawNoDataOverlay(svgComp: SvgElementComponent, msg: string, xOffset: number): void {
    const contents = msg.toUpperCase();
    const overlayGroup = svgComp.svg.append("g")
      .attr("class", "no-data-overlay");

    overlayGroup.append("rect")
      .attr("class", "no-data-overlay-bg")
      .attr("width", 900)
      .attr("height", 200);
    overlayGroup.append("text")
      .attr("class", "no-data-overlay-text")
      .attr("transform", "translate(" + xOffset + ", 110)")
      .html(contents);
  };

  public removeNoDataOverlay(svgComp: SvgElementComponent): void {
    svgComp.svg.selectAll(".no-data-overlay").remove();
  }

  public removeAllPlotContentsGroup(svgComp: SvgElementComponent): void {
    svgComp.plotContentsGroup.selectAll("*").remove();
  }

  public drawLegend(svgComp: SvgElementComponent, contributingStrains: string[]) {
    this.legend = svgComp.plotLegend;

    let translateX = 0;
    contributingStrains.forEach(e => {
      const name = e;
      const color = this.strainSvc.strainColor(e);
      const width = 13 + (name.length * 7) + 10;

      const keyElement = this.legend.append("g")
        .attr("id", "svg-" + name)
        .attr("transform", "translate(" + translateX + ", 10)");

      keyElement.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color);

      keyElement.append("text")
        .attr("transform", "translate(13, 10)")
        .style("font-size", 12)
        .html(name);

      translateX += width;
    })
  }

  public updateHaplotypes(svgComp: SvgElementComponent, haploData: any): void {
    this.removeNoDataOverlay(svgComp);
    haploData = this.dataCache.haplotypeData(haploData);
    const haplotypeMap = this.dataCache.haplotypeMap(this.strainSvc.strainMap);
    const strainNames = this.dataCache.strainName(this.strainSvc.strainNames);

    this.removeAllPlotContentsGroup(svgComp);

    if (this.intervalMode) {
      this.updateAxes(svgComp);
      if(!this.zoomTools.intervalIsSet()) {
        return;
      }
    }

    // TODO: What is this check, why is it here?
    if(haploData === null) {
      return;
    }

    if (!this.intervalMode) {
      svgComp.plotContentsGroup.selectAll(".bar")
        .data(this.chrIdsSvc.chrSizes)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d: ChrSize) => {
          return this.genomeScale(d.startPos);
        })
        .attr("y", (d: ChrSize) => {
          return this.chrOrdinalScale(d.chr);
        })
        .attr("height", this.chrOrdinalScale.bandwidth()) //function(d) { return height - y(d.value); })
        .attr("width", (d: ChrSize) => {
          return this.genomeScale(d.size)
        }); //x.rangeBand());
    }

    this.yAxisIDs.forEach((chr) => {
      if(!(chr in haploData.viterbi_haplotypes.chromosome_data)) {
        return;
      }
      const haplos = haploData.viterbi_haplotypes.chromosome_data[chr];
      const currChrSize = this.chrIdsSvc.chrSizesHash[chr];
      const _zoomInterval = this.zoomTools.zoomInterval(svgComp);
      if(haplos.haplotype_blocks) {
        // TODO: Should not be type `any`
        haplos.haplotype_blocks.forEach((currHaplo: any) => {
          const currStrain1 = haploData.contributing_strains[currHaplo.haplotype_index_1];
          const currStrainIdx1 = strainNames.indexOf(currStrain1);
          const currStrain2 = haploData.contributing_strains[currHaplo.haplotype_index_2];
          const currStrainIdx2 = strainNames.indexOf(currStrain2);

          let currHaploStart;
          let currHaploEnd;
          // currHaploStart = Math.max(currHaplo.start_position_bp, currChrSize.startPos);
          // currHaploEnd = Math.min(currHaplo.end_position_bp, currChrSize.startPos + currChrSize.size);

          if(this.intervalMode) {
            currHaploStart = Math.max(currHaplo.start_position_bp, _zoomInterval.startPos);
            currHaploEnd = Math.min(currHaplo.end_position_bp, _zoomInterval.startPos + _zoomInterval.size);
          } else {
            currHaploStart = Math.max(currHaplo.start_position_bp, currChrSize.startPos);
            currHaploEnd = Math.min(currHaplo.end_position_bp, currChrSize.startPos + currChrSize.size);
          }

          if(currHaploStart >= currHaploEnd) {
            return;
          }

          let currRect;
          if(currHaplo.haplotype_index_1 === currHaplo.haplotype_index_2) {
            currRect = svgComp.plotContentsGroup.append("rect")
              .attr("class", "bar")
              .attr("x", this.genomeScale(currHaploStart))
              // NOTE: These two lines were commented out in the legacy code without explanation
              //.attr("y", chrOrdinalScale(chr))
              //.attr("height", chrOrdinalScale.rangeBand())
              .attr("y", this.chrOrdinalScale(chr) + (this.chrOrdinalScale.bandwidth() / 2.0) - 0.5)
              .attr("height", this.chrOrdinalScale.bandwidth() / 2.0)
              .attr("width", this.genomeScale(currHaploEnd) - this.genomeScale(currHaploStart))
              .attr("class", "hap hap" + currStrainIdx1)
              // TODO: Need to fix strain to index / color mapping
              .on("mouseover", () => {
                this.highlightHaplotype(
                  this.strainSvc.strainIndex(currStrain1),
                  this.strainSvc.strainColor(currStrain1))
              })
              .on("mouseout", () => this.clearHaplotypeHightlight());
            // eslint-disable-next-line no-prototype-builtins
            if(haplotypeMap.hasOwnProperty(currStrain1)) {
              currRect.style('fill', this.strainSvc.strainColor(currStrain1));
            }
          } else {
            // TODO these bars may be flipped!
            currRect = svgComp.plotContentsGroup.append("rect")
              .attr("class", "bar")
              .attr("x", this.genomeScale(currHaploStart))
              // NOTE: These two lines were commented out in the legacy code without explanation
              //.attr("y", chrOrdinalScale(chr))
              //.attr("height", chrOrdinalScale.rangeBand() / 2.0)
              .attr("y", this.chrOrdinalScale(chr) + (this.chrOrdinalScale.bandwidth() / 2.0) - 0.5)
              .attr("height", this.chrOrdinalScale.bandwidth() / 4.0)
              .attr("width", this.genomeScale(currHaploEnd) - this.genomeScale(currHaploStart))
              .attr("class", "hap hap" + currStrainIdx1)
              // TODO: Need to fix strain to index / color mapping
              .on("mouseover", () => {
                this.highlightHaplotype(
                  this.strainSvc.strainIndex(currStrain1),
                  this.strainSvc.strainColor(currStrain1))
              })
              .on("mouseout", () => this.clearHaplotypeHightlight());
            // eslint-disable-next-line no-prototype-builtins
            if(haplotypeMap.hasOwnProperty(currStrain1)) {
              currRect.style('fill', this.strainSvc.strainColor(currStrain1));
            }

            currRect = svgComp.plotContentsGroup.append("rect")
              .attr("class", "bar")
              .attr("x", this.genomeScale(currHaploStart))
              // NOTE: These two lines were commented out in the legacy code without explanation
              //.attr("y", chrOrdinalScale(chr) + (chrOrdinalScale.rangeBand() / 2.0))
              //.attr("height", chrOrdinalScale.rangeBand() / 2.0)
              .attr("y", this.chrOrdinalScale(chr) + (3.0 * this.chrOrdinalScale.bandwidth() / 4.0) - 0.5)
              .attr("height", this.chrOrdinalScale.bandwidth() / 4.0)
              .attr("width", this.genomeScale(currHaploEnd) - this.genomeScale(currHaploStart))
              .attr("class", "hap hap" + currStrainIdx2)
              // TODO: Need to fix strain to index / color mapping
              .on("mouseover", () => {
                this.highlightHaplotype(
                  this.strainSvc.strainIndex(currStrain2),
                  this.strainSvc.strainColor(currStrain2))
              })
              .on("mouseout", () => this.clearHaplotypeHightlight());
            // eslint-disable-next-line no-prototype-builtins
            if(haplotypeMap.hasOwnProperty(currStrain2)) {
              currRect.style('fill', this.strainSvc.strainColor(currStrain2));
            }
          }
        });
      }

      if(haplos.concordance_bins) {
        // TODO: Should not be type `any`
        haplos.concordance_bins.forEach((currBin: any) => {
          let currBinStart;
          let currBinEnd;
          if(this.intervalMode) {
            currBinStart = Math.max(currBin.start_position_bp, _zoomInterval.startPos);
            currBinEnd = Math.min(currBin.end_position_bp, _zoomInterval.startPos + _zoomInterval.size);
          } else {
            currBinStart = Math.max(currBin.start_position_bp, currChrSize.startPos);
            currBinEnd = Math.min(currBin.end_position_bp, currChrSize.startPos + currChrSize.size);
          }

          if(currBinStart >= currBinEnd) {
            return;
          }

          let concordanceScore = currBin.concordant_count / currBin.informative_count;
          concordanceScore -= .5;
          concordanceScore *= 2;
          if(concordanceScore < 0) {
            concordanceScore = 0;
          }

          concordanceScore = 1.0 - concordanceScore;
          const height = concordanceScore * this.chrOrdinalScale.bandwidth() / 2.0;
          svgComp.plotContentsGroup.append("rect")
            .style('fill', 'red')
            .attr("x", this.genomeScale(currBinStart))
            // "- (height + 0.5)" : the concurrency bins need to be shifted up the 0.5 and the height of the haplotype bars
            .attr("y", this.chrOrdinalScale(chr) + (this.chrOrdinalScale.bandwidth() / 2.0) - (height + 0.5))
            .attr("height", height)
            .attr("width", this.genomeScale(currBinEnd) - this.genomeScale(currBinStart));
        });
      }
    });

  }

  public highlightHaplotype(strainIndex: number, strainColor: string) {
    this.clearHaplotypeHightlight();
    document.querySelectorAll<HTMLElement>('rect.hap').forEach(value => {
      if (!value.classList.contains('hap' + strainIndex)) {
        value.style.fillOpacity = '.25';
        value.style.stroke = '#000000';
      }
    })
    document.querySelectorAll<HTMLElement>('a.hap-link' + strainIndex).forEach( value => {
      value.style.boxShadow = '0px 0px 15px 2px ' + strainColor;
    })
  }

  public clearHaplotypeHightlight() {
    document.querySelectorAll<HTMLElement>('rect.hap').forEach(value => {
      value.style.fillOpacity = '';
      value.style.stroke = '';
    })
    document.querySelectorAll<HTMLElement>('a.hap-link').forEach(value => {
      value.style.boxShadow = '';
    })
  }

  public updateSNPBar(svgComp: SvgElementComponent, snpData?: SnpData) {
    const _snpData: SnpData = this.dataCache.snpData(snpData);
    svgComp.snpBar.selectAll("*").remove();
    const _zoomInterval = this.zoomTools.zoomInterval(svgComp);
    if (_snpData && _zoomInterval) {
      // set number of bands to show over interval here; higher for thinner bands, lower for thicker
      const numBands = 120;
      // const format = d3.format(",");

      // d3.select("body").selectAll("." + name).remove();

      const intervalWidth = this.genomeScale(_zoomInterval.endPos) - this.genomeScale(_zoomInterval.startPos);
      const snpBandWidth = intervalWidth/numBands;

      // determine how many base pairs are in each band
      const bpPerBand = (_zoomInterval.size/intervalWidth)*snpBandWidth;

      const snpBins = [];
      let bandCount = 0;
      let max = 0;
      for (let i = _zoomInterval.startPos; i <= _zoomInterval.endPos; i+=bpPerBand) {
        let count = 0;
        const positions: number[] = [];
        Object.entries(_snpData).forEach(((value, position, snpData) => {
          // console.log(position);
          // console.log(i);
          // console.log(i+bpPerBand);
          if (position >= i && position <= i+bpPerBand) {
            count++;
            // TODO: We might not need this check anymore
            // eslint-disable-next-line no-prototype-builtins
            if (snpData.hasOwnProperty(position)) {
              positions.push(position);
            }
          }
        }))
        // snpData.
        // _snpData.forEach(((value, position, snpData) => {
        //
        // }))
        if(count !== 0) {
          // check if max density
          if (count > max) {
            max = count;
          }
          snpBins.push({band: bandCount, density: count, snps: positions});
        }
        bandCount++;
      }

      // TODO: Fix this tooltip
      // make a tooltip that shows the data on the hovered snp
      // let snpTip = d3Tip()
      //   // TODO: Fix typescript warning "Deprecated symbol used, consult docs for better alternative"
      //   .attr("class", name)
      //   .style("background", "rgba(250, 250, 250, 0.8)")
      //   .style("padding", "8px")
      //   .style("border-radius", "5px")
      //   .offset([-10, 0])
      //   // TODO: Fix implicit any type
      //   .html((d: any) => {
      //     if (d.density === 1) {
      //       let snp = _snpData.get(d.snps[0]);
      //       if (typeof snp !== 'undefined') {
      //         return "<b>SNP ID:</b> " + snp.snp_id
      //           + "<br><b>Position:</b> " + format(d.snps[0]) + " b"
      //           + "<br><b>Allele 1 Fwd:</b> " + (snp.allele1_fwd)
      //           + "<br><b>Allele 2 Fwd:</b> " + (snp.allele2_fwd)
      //           + "<br><b>X Probe Call:</b> " + (snp.x_probe_call)
      //           + "<br><b>Y Probe Call:</b> " + (snp.y_probe_call)
      //           + "<br><b>Haplotype 1:</b> " + (snp.haplotype1)
      //           + "<br><b>Haplotype 2:</b> " + (snp.haplotype2);
      //       }
      //     }
      //
      //     return d.density + " SNPs"
      //   });

      // svgComp.snpBar.call(snpTip);
      // svgComp.snpBar;

      svgComp.snpBar.selectAll(".density-band")
        .data(snpBins)
        .enter()
        .append("rect")
        .attr("class", "density-band")
        .attr("width", snpBandWidth)
        .attr("height", 10)
        // TODO: Fix implicit any type
        .attr("transform", (d: SnpBinItem) => {
          return "translate(" + ((d.band)*snpBandWidth) + ", 0)"
        })
        // TODO: Fix implicit any type
        .style("fill", (d: any) => {
          // the max for density that was found earlier will be 100% opacity
          // calculate the opacity of all other bands based on the max
          const opacity = Math.round((d.density /max) * 100) / 100;
          return "rgba(0, 0, 0, " + opacity + ")";
        });
        // TODO: Fix these tooltip mouseovers
        // .on("mouseover", snpTip.show)
        // .on("mousemove", () => { // tooltip follows mouse
          // TODO: Fix d3 migration problem... see -> https://observablehq.com/@d3/d3v6-migration-guide
          // return snpTip.style("top",(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        // })
        // .on("mouseout", snpTip.hide);
    }
  }
}
