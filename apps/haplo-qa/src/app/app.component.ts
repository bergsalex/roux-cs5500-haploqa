import {Component} from '@angular/core';
import {mm10ChrSizes, SNP_DATA_ADG_1} from '@haploqa-modules/ngx-genome-karyotype-plots';
import {HAPLO_DATA_ADG, SAMPLE_ADG, STRAIN_MAP_ADG} from "@haploqa-modules/ngx-genome-karyotype-plots";

@Component({
  selector: 'haploqa-modules-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'haplo-qa';
  chrSizes = mm10ChrSizes;
  sample = SAMPLE_ADG;
  strainMap = STRAIN_MAP_ADG;
  haploData = HAPLO_DATA_ADG;
  snpData = SNP_DATA_ADG_1;
}
