import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewportSizeService {
  private readonly _renderer: Renderer2;
  private readonly _viewportSize$ = new BehaviorSubject(document.documentElement.clientWidth);


  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);

    this._init();
  }


  getViewportSize(): Observable<number> {
    return this._viewportSize$.asObservable();
  }


  private _init() {
    this._renderer.listen(window, 'resize', () => {
      this._viewportSize$.next(document.documentElement.clientWidth);
    });
  }
}
