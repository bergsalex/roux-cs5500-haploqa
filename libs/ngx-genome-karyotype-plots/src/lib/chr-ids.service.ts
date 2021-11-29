import { Injectable } from '@angular/core';

export interface ChrSize {
  /** An Interface representing the items in a ChrSizes array **/
  chr: string;
  size: number;
  startPos: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChrIdsService {
  /** This is a helper class to organize tools related to working with chromosome ids. **/

  public chrIDs: string[] = [];
  public minStartBp: number | null = null;
  public maxEndBp: number | null = null;
  public chrSizesHash: {[key: string]: ChrSize} = {};

  constructor() { }

  public initChrIds(chrSizes: ChrSize[]): void {
    chrSizes.forEach((currChr) => {
      if (this.minStartBp === null || currChr.startPos < this.minStartBp) {
        this.minStartBp = currChr.startPos;
      }

      let currEnd = currChr.startPos + currChr.size;
      if (this.maxEndBp === null || currEnd > this.maxEndBp) {
        this.maxEndBp = currEnd;
      }

      this.chrIDs.push(currChr.chr);
      this.chrSizesHash[currChr.chr] = currChr;
    })
  }
}
