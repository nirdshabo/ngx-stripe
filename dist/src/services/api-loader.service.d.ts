import { Observable } from 'rxjs';
import { WindowRef } from './window-ref.service';
import { DocumentRef } from './document-ref.service';
import { PlatformService } from './platform.service';
export interface Status {
    loaded: boolean;
    loading: boolean;
    error: boolean;
}
export declare class LazyStripeAPILoader {
    private window;
    private document;
    private _platform;
    private status;
    constructor(window: WindowRef, document: DocumentRef, _platform: PlatformService);
    asStream(): Observable<Status>;
    isReady(): boolean;
    load(): void;
}
