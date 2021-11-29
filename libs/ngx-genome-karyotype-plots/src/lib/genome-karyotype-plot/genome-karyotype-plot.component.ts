import {Component, OnInit, Input} from '@angular/core';
import {ChrIdsService, ChrSize} from "../chr-ids.service";

@Component({
  selector: 'ngx-genome-karyotype-plot',
  templateUrl: './genome-karyotype-plot.component.html',
  styleUrls: ['./genome-karyotype-plot.component.scss'],
  providers: []
})
export class GenomeKaryotypePlotComponent implements OnInit {

  @Input() name: string = 'Genome Karyotype Plot';
  @Input() width: number = 900;
  @Input() height: number = 900;
  @Input() margin: number = 50;
  @Input() chrSizes: ChrSize[] = [];

  constructor(private chrIdsSvc: ChrIdsService) { }

  ngOnInit(): void {
    this.chrIdsSvc.initChrIds(this.chrSizes);
  }

}
