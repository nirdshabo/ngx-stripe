import { InjectionToken } from '@angular/core';
import { Elements, ElementsOptions } from './elements';
import { Element } from './element';
import { CardDataOptions, TokenResult, BankAccount, BankAccountData, Pii, PiiData } from './token';
import { SourceData, SourceResult, SourceParams } from './sources';
export declare const STRIPE_PUBLISHABLE_KEY: InjectionToken<string>;
export declare const STRIPE_OPTIONS: InjectionToken<Options>;
export interface StripeJS {
    elements(options?: ElementsOptions): Elements;
    handleCardPayment(secret: string, element: Element, data?: any): Promise<any>;
    handleCardPayment(secret: string, data?: CardDataOptions): Promise<any>;
    confirmPaymentIntent(clientSecret: string, element: Element, data?: any): Promise<any>;
    confirmPaymentIntent(clientSecret: string, data?: any): Promise<any>;
    retrievePaymentIntent(clientSecret: string): Promise<any>;
    createToken(el: Element, cardData?: CardDataOptions): Promise<TokenResult>;
    createToken(account: BankAccount, bankAccountData: BankAccountData): Promise<TokenResult>;
    createToken(pii: Pii, piiData: PiiData): Promise<TokenResult>;
    createSource(el: Element, sourceData?: SourceData): Promise<SourceResult>;
    createSource(sourceData: SourceData): Promise<SourceResult>;
    retrieveSource(source: SourceParams): Promise<SourceResult>;
}
export interface Options {
    stripeAccount?: string;
    betas?: any[];
}
