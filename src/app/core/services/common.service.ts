import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
  ) { }

  checkDataType(val: any) {
    let value: any;
    if (val == "" || val == null || val == "null" || val == undefined || val == "undefined" || val == 'string' || val == null || val == 0) {
      value = false;
    } else {
      value = true;
    }
    return value;
  }

}
