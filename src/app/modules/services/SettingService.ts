import { Injectable} from '@angular/core';
import {BlogSettings} from './BlogSettings';
import {ElectronService}    from './ElectronService';

@Injectable()
export class SettingService {
    private mSetting: BlogSettings = new BlogSettings();

    constructor(private mElectron:ElectronService ) {

    }

    get Setting() {
        return this.mSetting;
    }

    LoadSettings(): void {       
        let folder = this.mElectron.App.getPath('userData');
      
        //  fs.readFileSync("/package.json",(error,data)=>{
        //      console.log(data);
        // });
        console.log(this.mElectron.Electron);
        console.log( folder );
        console.log( this.mElectron.Electron.remote.Menu);   
        this.mElectron.SetApplicationMenu(null);     
    }
    SaveSettings(): void {
        let jston = JSON.stringify(this.mSetting);

    }
}