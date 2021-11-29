import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {
  /** A simple service to cache needed data types for genome plots **/

  // TODO: Fix these types so that they're not `any`
  private cachedHaplotypeData!: any;
  private cachedSnpData!: any;
  private cachedHaplotypeMap!: {};
  private cachedStrainNames!: any;
  private cachedZoomInterval!: any;

  constructor() { }

  // TODO: The following public methods have a lot of repeated code. Is there any way to reduce that repetition?

  // TODO: Fix the arg types so that they're not `any`
  public haplotypeData(haploData?: any): any {
    if(typeof haploData === 'undefined') {
      haploData = this.cachedHaplotypeData;
    } else {
      this.cachedHaplotypeData = haploData;
    }
    return haploData;
  }

  // TODO: Fix the arg types so that they're not `any`
  public snpData(snpData?: any) {
    if (typeof snpData === 'undefined') {
      snpData = this.cachedSnpData;
    } else {
      this.cachedSnpData = snpData;
    }
    return snpData;
  }

  // TODO: Fix the arg types so that they're not `any`
  public haplotypeMap(haplotypeMap?: any): any {
    if (typeof haplotypeMap === 'undefined') {
      haplotypeMap = this.cachedHaplotypeMap;
    } else {
      this.cachedHaplotypeMap = haplotypeMap;
    }
    return haplotypeMap;
  }

  // TODO: Fix the arg types so that they're not `any`
  public strainName(strainNames?: any): any {
    if(typeof strainNames == 'undefined') {
      strainNames = this.cachedStrainNames;
    } else {
      this.cachedStrainNames = strainNames;
    }
    return strainNames;
  }

  // TODO: Fix the zoomInterval arg type, should NOT be `any`
  public zoomInterval(zoomInterval?: any): any {
    // TODO: Is this undefined check doing what we want it to?
    if (typeof zoomInterval === 'undefined') {
      zoomInterval = this.cachedZoomInterval;
    } else {
      this.cachedZoomInterval = zoomInterval;
    }
    return zoomInterval;
  }
}
