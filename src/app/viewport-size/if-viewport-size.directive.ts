import {Directive, Inject, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ViewportSize} from './viewport-size.type';
import {ViewportSizeService} from './viewport-size.service';
import {VIEWPORT_SIZE_CONFIG} from './viewport-size.injection-token';
import {IConfig} from './config.interface';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../shared/unsubscribable';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective extends Unsubscribable implements OnInit {
  @Input() ifViewportSize: ViewportSize;


  constructor(private readonly _templateRef: TemplateRef<any>,
              private readonly _viewContainerRef: ViewContainerRef,
              private readonly _viewportSizeService: ViewportSizeService,
              @Inject(VIEWPORT_SIZE_CONFIG) private readonly _config: IConfig) {
    super();
  }


  ngOnInit() {
    this._viewportSizeService.getViewportSize().pipe(
      takeUntil(this._onDestroy$)
    ).subscribe(
      (width: number) => {
        let show = true;


        switch (this.ifViewportSize) {
          case 'small': {
            show = width < this._config.medium;

            break;
          }

          case 'medium': {
            show = this._config.medium <= width && width < this._config.large;

            break;
          }

          case 'large': {
            show = this._config.large <= width;

            break;
          }
        }


        if (show) {
          if (!this._viewContainerRef.get(0)) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
          }
        } else {
          this._viewContainerRef.clear();
        }
      }
    );
  }
}

