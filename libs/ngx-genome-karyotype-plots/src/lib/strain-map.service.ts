import { Injectable } from '@angular/core';

export interface StrainMapItem {
  color: string,
  url: string
}

export type StrainMap = {[key:string]: StrainMapItem}

@Injectable({
  providedIn: 'root'
})
export class StrainMapService {

  private _strainMap: StrainMap = {};
  strainNames: string[] = [];

  set strainMap(newMap: StrainMap) {
    this._strainMap = newMap;
    this._resetStrainNames();
  }

  get strainMap(): StrainMap {
    return this._strainMap;
  }

  private _resetStrainNames(): void {
    this.strainNames = Object.keys(this._strainMap).sort();
  }

  public strainIndex(strainName: string): number {
    return this.strainNames.indexOf(strainName);
  }

  public strainColor(strainName: string): string {
    return this.strainMap[strainName].color;
  }

  public strainUrl(stainName: string): string {
    return this.strainMap[stainName].url;
  }

}
