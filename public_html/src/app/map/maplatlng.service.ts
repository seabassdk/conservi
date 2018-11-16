import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaplatlngService {
  latlngActivated = new Subject();

  constructor() { }
}
