import { Observable, ReplaySubject } from 'rxjs';
import { Element } from '../interfaces/element';
import { Elements, ElementsOptions } from '../interfaces/elements';
import { SourceData, SourceParams, SourceResult } from '../interfaces/sources';
import { Options, StripeJS } from '../interfaces/stripe';
import { BankAccount, BankAccountData, CardDataOptions, Pii, PiiData, TokenResult } from '../interfaces/token';
import { LazyStripeAPILoader } from './api-loader.service';
import { PlatformService } from './platform.service';
import { WindowRef } from './window-ref.service';
export declare class StripeService {
    private key;
    private options;
    private loader;
    private window;
    private _platform;
    stripeChanged$: ReplaySubject<StripeJS>;
    stripe: StripeJS;
    constructor(key: string, options: Options, loader: LazyStripeAPILoader, window: WindowRef, _platform: PlatformService);
    changeKey(key: string, options?: Options): Observable<StripeJS | undefined>;
    getInstance(): StripeJS;
    elements(options?: ElementsOptions): Observable<Elements>;
    createToken(a: Element | BankAccount | Pii, b: CardDataOptions | BankAccountData | PiiData | undefined): Observable<TokenResult>;
    createSource(a: Element | SourceData, b?: SourceData | undefined): Observable<SourceResult>;
    retrieveSource(source: SourceParams): Observable<SourceResult>;
}
