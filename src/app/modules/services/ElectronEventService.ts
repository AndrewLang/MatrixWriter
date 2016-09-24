import {Injectable} from '@angular/core';

import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {ElectronService}    from './ElectronService';

declare var window: any;

@Injectable()
export class ElectronEventService {
    constructor(private electronService:ElectronService){

    }
    public on(name: string): Observable<any> {
        return Observable.fromEvent(window, name);
    }

    Log(message: string) {
        this.electronService.IpcClient.send('mw:log', message);
    }
}