/**
 * @license beatbase/ngx-stripe
 * UNLICENSED
 * Copyright © 2017 beatbase ApS, LLC. All Rights Reserved
 */

import { Component, EventEmitter, Inject, Injectable, InjectionToken, Input, NgModule, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { __assign } from 'tslib';
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

var PlatformService = /** @class */ (function () {
    function PlatformService(platformId) {
        this.platformId = platformId;
    }
    Object.defineProperty(PlatformService.prototype, "isBrowser", {
        get: /**
         * @return {?}
         */
        function () {
            return isPlatformBrowser(this.platformId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformService.prototype, "isServer", {
        get: /**
         * @return {?}
         */
        function () {
            return isPlatformServer(this.platformId);
        },
        enumerable: true,
        configurable: true
    });
    PlatformService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PlatformService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return PlatformService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WindowRef = /** @class */ (function () {
    function WindowRef(_platform) {
        this._platform = _platform;
    }
    /**
     * @return {?}
     */
    WindowRef.prototype.getNativeWindow = /**
     * @return {?}
     */
    function () {
        if (this._platform.isBrowser) {
            return window;
        }
        return /** @type {?} */ ({});
    };
    WindowRef.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WindowRef.ctorParameters = function () { return [
        { type: PlatformService }
    ]; };
    return WindowRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DocumentRef = /** @class */ (function () {
    function DocumentRef(_platform) {
        this._platform = _platform;
    }
    /**
     * @return {?}
     */
    DocumentRef.prototype.getNativeDocument = /**
     * @return {?}
     */
    function () {
        if (this._platform.isBrowser) {
            return document;
        }
        return /** @type {?} */ ({});
    };
    DocumentRef.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DocumentRef.ctorParameters = function () { return [
        { type: PlatformService }
    ]; };
    return DocumentRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */

var LazyStripeAPILoader = /** @class */ (function () {
    function LazyStripeAPILoader(window, document, _platform) {
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
    LazyStripeAPILoader.prototype.asStream = /**
     * @return {?}
     */
    function () {
        this.load();
        return this.status.asObservable();
    };
    /**
     * @return {?}
     */
    LazyStripeAPILoader.prototype.isReady = /**
     * @return {?}
     */
    function () {
        return this.status.getValue().loaded;
    };
    /**
     * @return {?}
     */
    LazyStripeAPILoader.prototype.load = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
                this.status.next(__assign({}, this.status.getValue(), { loading: true }));
                /** @type {?} */
                var script = this.document
                    .getNativeDocument()
                    .createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.defer = true;
                script.src = 'https://js.stripe.com/v3/';
                script.onload = function () {
                    _this.status.next({
                        error: false,
                        loaded: true,
                        loading: false
                    });
                };
                script.onerror = function () {
                    _this.status.next({
                        error: true,
                        loaded: false,
                        loading: false
                    });
                };
                this.document.getNativeDocument().body.appendChild(script);
            }
        }
    };
    LazyStripeAPILoader.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LazyStripeAPILoader.ctorParameters = function () { return [
        { type: WindowRef },
        { type: DocumentRef },
        { type: PlatformService }
    ]; };
    return LazyStripeAPILoader;
}());

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
var STRIPE_PUBLISHABLE_KEY = new InjectionToken('Stripe Publishable Key');
/** @type {?} */
var STRIPE_OPTIONS = new InjectionToken('Stripe Options');
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
var StripeService = /** @class */ (function () {
    function StripeService(key, options, loader, window, _platform) {
        this.key = key;
        this.options = options;
        this.loader = loader;
        this.window = window;
        this._platform = _platform;
        this.stripeChanged$ = new ReplaySubject();
        this.stripe = /** @type {?} */ ({});
        this.changeKey(this.key, this.options)
            .pipe(take(1))
            .subscribe(function () { });
    }
    /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    StripeService.prototype.changeKey = /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    function (key, options) {
        var _this = this;
        /** @type {?} */
        var obs = this.loader.asStream().pipe(filter(function (status) { return status.loaded === true; }), map(function () {
            if (!_this.window.getNativeWindow()) {
                return;
            }
            /** @type {?} */
            var Stripe = (/** @type {?} */ (_this.window.getNativeWindow())).Stripe;
            _this.stripe = options
                ? (/** @type {?} */ (Stripe(key, options)))
                : (/** @type {?} */ (Stripe(key)));
            _this.stripeChanged$.next(_this.stripe);
            return _this.stripe;
        }), publishLast(), refCount());
        obs.subscribe();
        return obs;
    };
    /**
     * @return {?}
     */
    StripeService.prototype.getInstance = /**
     * @return {?}
     */
    function () {
        return this.stripe;
    };
    /**
     * @param {?=} options
     * @return {?}
     */
    StripeService.prototype.elements = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        return this.stripeChanged$.pipe(map(function () { return _this.stripe.elements(options); }));
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    StripeService.prototype.createToken = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (isBankAccount(a) && isBankAccountData(b)) {
            return from(this.stripe.createToken(a, b));
        }
        else if (isPii(a) && isPiiData(b)) {
            return from(this.stripe.createToken(a, b));
        }
        else {
            return from(this.stripe.createToken(/** @type {?} */ (a), /** @type {?} */ (b)));
        }
    };
    /**
     * @param {?} a
     * @param {?=} b
     * @return {?}
     */
    StripeService.prototype.createSource = /**
     * @param {?} a
     * @param {?=} b
     * @return {?}
     */
    function (a, b) {
        if (isSourceData(a)) {
            return from(this.stripe.createSource(/** @type {?} */ (a)));
        }
        return from(this.stripe.createSource(/** @type {?} */ (a), b));
    };
    /**
     * @param {?} source
     * @return {?}
     */
    StripeService.prototype.retrieveSource = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return from(this.stripe.retrieveSource(source));
    };
    StripeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StripeService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [STRIPE_PUBLISHABLE_KEY,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [STRIPE_OPTIONS,] }] },
        { type: LazyStripeAPILoader },
        { type: WindowRef },
        { type: PlatformService }
    ]; };
    return StripeService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StripeCardComponent = /** @class */ (function () {
    function StripeCardComponent(stripeService) {
        this.stripeService = stripeService;
        this.change = new EventEmitter();
        this.complete = new EventEmitter();
        this.error = new EventEmitter();
        this.options$ = new BehaviorSubject({});
        this.elementsOptions$ = new BehaviorSubject({});
    }
    Object.defineProperty(StripeCardComponent.prototype, "options", {
        set: /**
         * @param {?} optionsIn
         * @return {?}
         */
        function (optionsIn) {
            this.options$.next(optionsIn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StripeCardComponent.prototype, "elementsOptions", {
        set: /**
         * @param {?} optionsIn
         * @return {?}
         */
        function (optionsIn) {
            this.elementsOptions$.next(optionsIn);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    StripeCardComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var elements$ = this.elementsOptions$.asObservable().pipe(switchMap(function (options) {
            if (Object.keys(options).length > 0) {
                return _this.stripeService.elements(options);
            }
            return _this.stripeService.elements();
        }));
        combineLatest(elements$, this.options$.asObservable().pipe(filter(function (options) { return Boolean(options); }))).subscribe(function (_a) {
            var elements = _a[0], options = _a[1];
            if (_this.card) {
                _this.element = elements.create('card', options);
                _this.element.mount(_this.card.nativeElement);
                _this.element.on('change', function (changedCard) {
                    _this.change.emit(/** @type {?} */ ({
                        card: changedCard,
                        element: _this.element
                    }));
                    if (changedCard.complete) {
                        _this.complete.emit(/** @type {?} */ ({
                            card: changedCard,
                            element: _this.element
                        }));
                    }
                    if (changedCard.error) {
                        _this.error.emit(changedCard.error);
                    }
                });
            }
        });
    };
    /**
     * @return {?}
     */
    StripeCardComponent.prototype.getCard = /**
     * @return {?}
     */
    function () {
        return this.element;
    };
    StripeCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-stripe-card',
                    template: "<div class=\"field\" #card></div>"
                },] },
    ];
    /** @nocollapse */
    StripeCardComponent.ctorParameters = function () { return [
        { type: StripeService }
    ]; };
    StripeCardComponent.propDecorators = {
        change: [{ type: Output }],
        complete: [{ type: Output }],
        error: [{ type: Output }],
        card: [{ type: ViewChild, args: ['card',] }],
        options: [{ type: Input }],
        elementsOptions: [{ type: Input }]
    };
    return StripeCardComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */

var NgxStripeModule = /** @class */ (function () {
    function NgxStripeModule() {
    }
    /**
     * @param {?} publishableKey
     * @param {?=} options
     * @return {?}
     */
    NgxStripeModule.forRoot = /**
     * @param {?} publishableKey
     * @param {?=} options
     * @return {?}
     */
    function (publishableKey, options) {
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
    };
    NgxStripeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [StripeCardComponent],
                    exports: [StripeCardComponent]
                },] },
    ];
    return NgxStripeModule;
}());

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
