import { ComponentRef, Injectable, Injector, OnDestroy, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';

import { BottomSheetModule } from './bottom-sheet.module';
import { BottomSheetRef } from './bottom-sheet-ref';
import { BOTTOM_SHEET_DATA, BottomSheetConfig } from './bottom-sheet-config';
import { BottomSheetContainerComponent } from './bottom-sheet-container.component';

@Injectable({ providedIn: BottomSheetModule })
export class BottomSheetService implements OnDestroy {
    private _bottomSheetRefAtThisLevel: BottomSheetRef | null = null;

    private get _openedBottomSheetRef(): BottomSheetRef | null {
        const parent = this._parentBottomSheet;
        return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
    }

    private set _openedBottomSheetRef(value: BottomSheetRef | null) {
        if (this._parentBottomSheet) {
            this._parentBottomSheet._openedBottomSheetRef = value;
        } else {
            this._bottomSheetRefAtThisLevel = value;
        }
    }

    constructor(
        private _overlay: Overlay,
        private _injector: Injector,
        @Optional() @SkipSelf() private _parentBottomSheet: BottomSheetService) {
    }

    open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                              config?: BottomSheetConfig<D>): BottomSheetRef<T, R> {
        const _config = _applyConfigDefaults(new BottomSheetConfig(), config);
        const overlayRef = this._createOverlay(_config);
        const container = this._attachContainer(overlayRef, _config);
        const ref = new BottomSheetRef<T, R>(container, overlayRef);

        if (componentOrTemplateRef instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal<T>(componentOrTemplateRef, null, {
                $implicit: _config.data,
                bottomSheetRef: ref
            } as any));
        } else {
            const portal = new ComponentPortal(componentOrTemplateRef, undefined, this._createInjector(_config, ref));
            const contentRef = container.attachComponentPortal(portal);
            ref.instance = contentRef.instance;
        }

        ref.afterDismissed().subscribe(() => {
            if (this._openedBottomSheetRef === ref) {
                this._openedBottomSheetRef = null;
            }
        });

        if (this._openedBottomSheetRef) {
            this._openedBottomSheetRef.afterDismissed().subscribe(() => ref.container.enter());
            this._openedBottomSheetRef.dismiss();
        } else {
            ref.container.enter();
        }

        this._openedBottomSheetRef = ref;
        return ref;
    }

    dismiss(): void {
        if (this._openedBottomSheetRef) {
            this._openedBottomSheetRef.dismiss();
        }
    }

    ngOnDestroy() {
        if (this._bottomSheetRefAtThisLevel) {
            this._bottomSheetRefAtThisLevel.dismiss();
        }
    }

    private _attachContainer(overlayRef: OverlayRef,
                             config: BottomSheetConfig): BottomSheetContainerComponent {

        const userInjector = config?.viewContainerRef?.injector;
        const injector = new PortalInjector(userInjector || this._injector, new WeakMap([
            [BottomSheetConfig, config]
        ]));

        const containerPortal =
            new ComponentPortal(BottomSheetContainerComponent, config.viewContainerRef, injector);
        const containerRef: ComponentRef<BottomSheetContainerComponent> = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }

    private _createOverlay(config: BottomSheetConfig): OverlayRef {
        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            maxWidth: '100%',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .global()
                .centerHorizontally()
                .bottom('0')
        });

        if (config.backdropClass) {
            overlayConfig.backdropClass = config.backdropClass;
        }

        return this._overlay.create(overlayConfig);
    }

    private _createInjector<T>(config: BottomSheetConfig, bottomSheetRef: BottomSheetRef<T>): PortalInjector {
        const userInjector = config?.viewContainerRef?.injector;
        const injectionTokens = new WeakMap<any, any>([
            [ BottomSheetRef, bottomSheetRef ],
            [ BOTTOM_SHEET_DATA, config.data ]
        ]);

        return new PortalInjector(userInjector || this._injector, injectionTokens);
    }
}

function _applyConfigDefaults(defaults: BottomSheetConfig, config?: BottomSheetConfig): BottomSheetConfig {
    return {...defaults, ...config};
}
