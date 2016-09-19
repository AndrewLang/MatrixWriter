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

    LoadSettings(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            let folder = self.GetFolder();
            self.mElectron.ReadFileAsync(folder + "/" + self.mConfiFileName)
                .then(data => {

                    let content = self.mElectron.Decrypt(data);

                    self.mSetting = JSON.parse(content);
                    console.log(self.mSetting);
                    resolve(true);
                })
                .catch(reason=>{
                    console.log("Load setting failed. " + reason)
                });

        })
    }

    SaveSettings(): void {
        let folder = this.GetFolder();

        let content = JSON.stringify(this.mSetting);
        content = this.mElectron.Encrypt(content);

        this.mElectron.WriteFileAsync(folder + "/" + this.mConfiFileName, content)
            .then(response => {
                console.log("file saved");
            })
            .catch( reason=>{
                console.log("save setting failes. " + reason);
            });
    }

    private GetFolder(): string {
        return this.mElectron.App.getPath('userData');
    }
}