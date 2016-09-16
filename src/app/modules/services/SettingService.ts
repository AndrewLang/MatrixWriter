
import {BlogSettings} from './BlogSettings';

import * as fs from "fs"
//import {ipcRenderer} from 'electron';

const electron = require('electron');
const app = electron.app;

export class SettingService
{
    private mSetting : BlogSettings= new BlogSettings();

    get Setting(){
        return this.mSetting;
    }

    LoadSettings():void{
        let folder = app.getPath('userData');
    }
    SaveSettings():void{
        let jston = JSON.stringify( this.mSetting );
        
    }
}