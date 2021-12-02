import { Injectable } from '@angular/core';

export interface ChrSize {
  /** An Interface representing the items in a ChrSizes array **/
  chr: string;
  size: number;
  startPos: number;
}

@Injectable()
export class ChrIdsService {
  /** This is a helper class to organize tools related to working with chromosome ids. **/

  public chrIDs: string[] = [];
  public chrSizes: ChrSize[] = [];
  public minStartBp!: number;
  public maxEndBp!: number;
  public chrSizesHash: {[key: string]: ChrSize} = {};

  constructor() {}

  public initChrIds(chrSizes: ChrSize[]): void {
    this.chrSizes = chrSizes;
    this.chrSizes.forEach((currChr) => {
      if (typeof this.minStartBp === 'undefined' || currChr.startPos < this.minStartBp) {
        this.minStartBp = currChr.startPos;
      }

      let currEnd = currChr.startPos + currChr.size;
      if (typeof  this.maxEndBp === 'undefined' || currEnd > this.maxEndBp) {
        this.maxEndBp = currEnd;
      }

      this.chrIDs.push(currChr.chr);
      this.chrSizesHash[currChr.chr] = currChr;
    })
  }
}
