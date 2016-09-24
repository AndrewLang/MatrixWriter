import {Injectable} from '@angular/core';

import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {ElectronService}    from './ElectronService';

declare var window: any;

@Injectable()
export class ElectronEventService {
    constructor(private electronService: ElectronService) {

    }
    public on(name: string): Observable<any> {
        return Observable.fromEvent(window, name);
    }
    get IpcClient(): any {
        return this.electronService.IpcClient;
    }
    Log(message: string) {
        this.IpcClient.send('mw:log', message);
    }
    OpenFileDialog(title?: string, defaultPath?: string, filters?:any[]): string {
        let paths = this.IpcClient.sendSync('mw:OpenFileDialog', title, defaultPath, filters);
        console.log(paths);
        if (paths && paths.length > 0)
            return paths[0];
        else
            return null;
    }
}