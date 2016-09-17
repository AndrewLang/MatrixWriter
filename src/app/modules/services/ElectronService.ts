import { Injectable} from '@angular/core';


declare var electron: any;
declare var mainWindow :any;

@Injectable()
export class ElectronService{
    get Electron ():any{
        return electron;
    }   
    get App ():any{
        return electron.remote.app;
    }
    get MainMenu():any{
        return electron.remote.menu;
    }

    SetApplicationMenu( menu:any ):void{
        electron.remote.menu.setApplicationMenu(menu );
    }

    OpenExternal( url : string ):void {
        electron.remote.shell.openExternal(url);
    }
}