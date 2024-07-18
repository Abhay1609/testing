import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
    private _triggerTotalUpdate = new Subject<any>();

    get triggerTotalUpdate$() {
      return this._triggerTotalUpdate.asObservable();
    }
  
    triggerTotalUpdate(userData: any) {
      this._triggerTotalUpdate.next(userData);
    }
}