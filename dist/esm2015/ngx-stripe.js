/**
 * @license beatbase/ngx-stripe
 * UNLICENSED
 * Copyright © 2017 beatbase ApS, LLC. All Rights Reserved
 */

import { Component, EventEmitter, Inject, Injectable, InjectionToken, Input, NgModule, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject, combineLatest, from } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { filter, map, publishLast, refCount, switchMap, take } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */

class PlatformService {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    get isBrowser() {
        return isPlatformBrowser(this.platformId);
    }
    /**
     * @return {?}
     */
    get isServer() {
        return isPlatformServer(this.platformId);
    }
}
PlatformService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PlatformService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WindowRef {
    /**
     * @param {?} _platform
     */
    constructor(_platform) {
        this._platform = _platform;
    }
    /**
     * @return {?}
     */
    getNativeWindow() {
        if (this._platform.isBrowser) {
            return window;
        }
        return /** @type {?} */ ({});
    }
}
WindowRef.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WindowRef.ctorParameters = () => [
    { type: PlatformService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DocumentRef {
    /**
     * @param {?} _platform
     */
    constructor(_platform) {
        this._platform = _platform;
    }
    /**
     * @return {?}
     */
    getNativeDocument() {
        if (this._platform.isBrowser) {
            return document;
        }
        return /** @type {?} */ ({});
    }
}
DocumentRef.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DocumentRef.ctorParameters = () => [
    { type: PlatformService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */

class LazyStripeAPILoader {
    /**
     * @param {?} window
     * @param {?} document
     * @param {?} _platform
     */
    constructor(window, document, _platform) {
        this.window = window;
        this.document = document;
        this._platform = _platform;
        this.status = new BehaviorSubject({
            error: false,
            loaded: false,
            loading: false
        });
    }
    /**
     * @return {?}
     */
    asStream() {
        this.load();
        return this.status.asObservable();
    }
    /**
     * @return {?}
     */
    isReady() {
        return this.status.getValue().loaded;
    }
    /**
     * @return {?}
     */
    load() {
        if (this._platform.isServer) {
            return;
        }
        if (this.window.getNativeWindow().hasOwnProperty('Stripe')) {
            this.status.next({
                error: false,
                loaded: true,
                loading: false
            });
        }
        else {
            if (!this.status.getValue().loaded && !this.status.getValue().loading) {
                this.status.next(Object.assign({}, this.status.getValue(), { loading: true }));
                /** @type {?} */
                const script = this.document
                    .getNativeDocument()
                    .createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.defer = true;
                script.src = 'https://js.stripe.com/v3/';
                script.onload = () => {
                    this.status.next({
                        error: false,
                        loaded: true,
                        loading: false
                    });
                };
                script.onerror = () => {
                    this.status.next({
                        error: true,
                        loaded: false,
                        loading: false
                    });
                };
                this.document.getNativeDocument().body.appendChild(script);
            }
        }
    }
}
LazyStripeAPILoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LazyStripeAPILoader.ctorParameters = () => [
    { type: WindowRef },
    { type: DocumentRef },
    { type: PlatformService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @param {?} sourceData
 * @return {?}
 */
function isSourceData(sourceData) {
    return 'type' in sourceData;
}
/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const STRIPE_PUBLISHABLE_KEY = new InjectionToken('Stripe Publishable Key');
/** @type {?} */
const STRIPE_OPTIONS = new InjectionToken('Stripe Options');
/**
 * @record
 */

/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @param {?} account
 * @return {?}
 */
function isBankAccount(account) {
    return account === 'bank_account';
}
/**
 * @param {?} bankAccountData
 * @return {?}
 */
function isBankAccountData(bankAccountData) {
    return ('country' in bankAccountData &&
        'currency' in bankAccountData &&
        'routing_number' in bankAccountData &&
        'account_number' in bankAccountData &&
        'account_holder_name' in bankAccountData &&
        'account_holder_type' in bankAccountData &&
        (bankAccountData.account_holder_type === 'individual' ||
            bankAccountData.account_holder_type === 'company'));
}
/**
 * @param {?} pii
 * @return {?}
 */
function isPii(pii) {
    return pii === 'pii';
}
/**
 * @param {?} piiData
 * @return {?}
 */
function isPiiData(piiData) {
    return 'personal_id_number' in piiData;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StripeService {
    /**
     * @param {?} key
     * @param {?} options
     * @param {?} loader
     * @param {?} window
     * @param {?} _platform
     */
    constructor(key, options, loader, window, _platform) {
        this.key = key;
        this.options = options;
        this.loader = loader;
        this.window = window;
        this._platform = _platform;
        this.stripeChanged$ = new ReplaySubject();
        this.stripe = /** @type {?} */ ({});
        this.changeKey(this.key, this.options)
            .pipe(take(1))
            .subscribe(() => { });
    }
    /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    changeKey(key, options) {
        /** @type {?} */
        const obs = this.loader.asStream().pipe(filter((status) => status.loaded === true), map(() => {
            if (!this.window.getNativeWindow()) {
                return;
            }
            /** @type {?} */
            const Stripe = (/** @type {?} */ (this.window.getNativeWindow())).Stripe;
            this.stripe = options
                ? (/** @type {?} */ (Stripe(key, options)))
                : (/** @type {?} */ (Stripe(key)));
            this.stripeChanged$.next(this.stripe);
            return this.stripe;
        }), publishLast(), refCount());
        obs.subscribe();
        return obs;
    }
    /**
     * @return {?}
     */
    getInstance() {
        return this.stripe;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    elements(options) {
        return this.stripeChanged$.pipe(map(() => this.stripe.elements(options)));
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    createToken(a, b) {
        if (isBankAccount(a) && isBankAccountData(b)) {
            return from(this.stripe.createToken(a, b));
        }
        else if (isPii(a) && isPiiData(b)) {
            return from(this.stripe.createToken(a, b));
        }
        else {
            return from(this.stripe.createToken(/** @type {?} */ (a), /** @type {?} */ (b)));
        }
    }
    /**
     * @param {?} a
     * @param {?=} b
     * @return {?}
     */
    createSource(a, b) {
        if (isSourceData(a)) {
            return from(this.stripe.createSource(/** @type {?} */ (a)));
        }
        return from(this.stripe.createSource(/** @type {?} */ (a), b));
    }
    /**
     * @param {?} source
     * @return {?}
     */
    retrieveSource(source) {
        return from(this.stripe.retrieveSource(source));
    }
}
StripeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
StripeService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [STRIPE_OPTIONS,] }] },
    { type: LazyStripeAPILoader },
    { type: WindowRef },
    { type: PlatformService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StripeCardComponent {
    /**
     * @param {?} stripeService
     */
    constructor(stripeService) {
        this.stripeService = stripeService;
        this.change = new EventEmitter();
        this.complete = new EventEmitter();
        this.error = new EventEmitter();
        this.options$ = new BehaviorSubject({});
        this.elementsOptions$ = new BehaviorSubject({});
    }
    /**
     * @param {?} optionsIn
     * @return {?}
     */
    set options(optionsIn) {
        this.options$.next(optionsIn);
    }
    /**
     * @param {?} optionsIn
     * @return {?}
     */
    set elementsOptions(optionsIn) {
        this.elementsOptions$.next(optionsIn);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const elements$ = this.elementsOptions$.asObservable().pipe(switchMap(options => {
            if (Object.keys(options).length > 0) {
                return this.stripeService.elements(options);
            }
            return this.stripeService.elements();
        }));
        combineLatest(elements$, this.options$.asObservable().pipe(filter(options => Boolean(options)))).subscribe(([elements, options]) => {
            if (this.card) {
                this.element = elements.create('card', options);
                this.element.mount(this.card.nativeElement);
                this.element.on('change', changedCard => {
                    this.change.emit(/** @type {?} */ ({
                        card: changedCard,
                        element: this.element
                    }));
                    if (changedCard.complete) {
                        this.complete.emit(/** @type {?} */ ({
                            card: changedCard,
                            element: this.element
                        }));
                    }
                    if (changedCard.error) {
                        this.error.emit(changedCard.error);
                    }
                });
            }
        });
    }
    /**
     * @return {?}
     */
    getCard() {
        return this.element;
    }
}
StripeCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-stripe-card',
                template: `<div class="field" #card></div>`
            },] },
];
/** @nocollapse */
StripeCardComponent.ctorParameters = () => [
    { type: StripeService }
];
StripeCardComponent.propDecorators = {
    change: [{ type: Output }],
    complete: [{ type: Output }],
    error: [{ type: Output }],
    card: [{ type: ViewChild, args: ['card',] }],
    options: [{ type: Input }],
    elementsOptions: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */

class NgxStripeModule {
    /**
     * @param {?} publishableKey
     * @param {?=} options
     * @return {?}
     */
    static forRoot(publishableKey, options) {
        return {
            ngModule: NgxStripeModule,
            providers: [
                LazyStripeAPILoader,
                StripeService,
                PlatformService,
                WindowRef,
                DocumentRef,
                {
                    provide: STRIPE_PUBLISHABLE_KEY,
                    useValue: publishableKey
                },
                {
                    provide: STRIPE_OPTIONS,
                    useValue: options
                }
            ]
        };
    }
}
NgxStripeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [StripeCardComponent],
                exports: [StripeCardComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { NgxStripeModule, StripeCardComponent, StripeService, LazyStripeAPILoader, WindowRef, DocumentRef, PlatformService, isSourceData, STRIPE_PUBLISHABLE_KEY, STRIPE_OPTIONS, isBankAccount, isBankAccountData, isPii, isPiiData };
//# sourceMappingURL=ngx-stripe.js.map
