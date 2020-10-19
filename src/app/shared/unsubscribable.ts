import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export abstract class Unsubscribable implements OnDestroy {
  public readonly _onDestroy$ = new Subject();


  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
