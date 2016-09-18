import {Injectable}         from '@angular/core';
import {BlogSettings}       from './BlogSettings';
import {ElectronService}    from './ElectronService';



@Injectable()
export class SettingService {
    private mConfiFileName: string = "matrix-writer-config.dat";
    private mSetting: BlogSettings = new BlogSettings();

    constructor(private mElectron: ElectronService) {

    }

    get Setting() {
        return this.mSetting;
    }

    LoadSettings(): void {
        let folder = this.GetFolder();
        this.mElectron.ReadFileAsync(folder + "/" + this.mConfiFileName)
            .then(data => {
                console.log(data);
                let content = this.mElectron.Decrypt(data);
                console.log(content);
                this.mSetting = JSON.parse(content);
            });
    }

    SaveSettings(): void {
        let folder = this.GetFolder();

        let content = JSON.stringify(this.mSetting);
        content = this.mElectron.Encrypt(content);

        this.mElectron.WriteFileAsync(folder + "/" + this.mConfiFileName, content)
            .then(response => {
                console.log("file saved");
            });
    }

    private GetFolder(): string {
        return this.mElectron.App.getPath('userData');
    }
}