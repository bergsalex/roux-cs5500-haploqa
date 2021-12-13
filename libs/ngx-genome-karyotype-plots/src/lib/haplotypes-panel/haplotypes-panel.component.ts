import {Component, Input, OnInit} from '@angular/core';
import {StrainMapService} from "../strain-map.service";
import {SvgToolsService} from "../svg-tools.service";

@Component({
  selector: 'ngx-genome-haplotype-panel',
  templateUrl: './haplotypes-panel.component.html',
  styleUrls: ['./haplotypes-panel.component.scss']
})
export class HaplotypesPanelComponent {

  @Input() sample: any;

  constructor(private strainSvc: StrainMapService, private svgTools: SvgToolsService) { }

  get contributingStrains(): string[] {
    if (typeof this.sample === 'undefined') {
      return [];
    } else {
      return this.sample.contributing_strains;
    }
  }

  public strainIndex(strainName: string): number {
    return this.strainSvc.strainIndex(strainName);
  }

  public highlightStrain(strainName: string): void {
    this.svgTools.highlightHaplotype(
      this.strainSvc.strainIndex(strainName),
      this.strainSvc.strainColor(strainName)
    );
  }

  public clearStrainHighlight(): void {
    this.svgTools.clearHaplotypeHightlight();
  }

  public strainColor(strainName: string): string {
    return this.strainSvc.strainColor(strainName);
  }

}
