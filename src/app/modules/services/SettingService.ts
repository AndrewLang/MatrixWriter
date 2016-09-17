
import {BlogSettings} from './BlogSettings';

//import * as fs from "fs"
const electron = require('electron');

// const electron = require('electron');
// const app = electron.app;
declare var fs :any;

export class SettingService
{
    private mSetting : BlogSettings= new BlogSettings();

    get Setting(){
        return this.mSetting;
    }

    LoadSettings():void{
        //let fs = require("fs");
        //let folder = app.getPath('userData');
        console.log(fs);
         fs.readFileSync("/package.json",(error,data)=>{
             console.log(data);
        });
        
    }
    SaveSettings():void{
        let jston = JSON.stringify( this.mSetting );
        
    }
}