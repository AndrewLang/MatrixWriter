import {Injectable}         from '@angular/core';
import {BlogSettings}       from './BlogSettings';
import {ElectronService}    from './ElectronService';
import {BlogAccount}        from './BlogAccount';


@Injectable()
export class SettingService {
    private mConfiFileName: string = "matrix-writer-config.dat";
    private mSetting: BlogSettings = new BlogSettings();
    private mDefaultAccount: BlogAccount;
    

    constructor(private mElectron: ElectronService) {
        console.log("constructor of setting service")
    }

    get DefaultAccount(): BlogAccount {
        return this.mDefaultAccount;
    }
    set DefaultAccount(value: BlogAccount) {
        this.mDefaultAccount = value;
    }
    get Setting() {
        return this.mSetting;
    }

    LoadSettings(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            let folder = self.GetFolder();
            console.log("load from folder: " + folder);
            self.mElectron.ReadFileAsync(folder + "/" + self.mConfiFileName)
                .then(data => {
                    let content = self.mElectron.Decrypt(data);
                    self.mSetting = JSON.parse(content);
                    console.log(self.mSetting);
                    self.DefaultAccount = self.GetDefaultAccount();
                    resolve(true);
                })
                .catch(reason => {
                    console.log("Load setting failed. " + reason)
                });
        })
    }

    SaveSettings(): void {
        let folder = this.GetFolder();

        let content = JSON.stringify(this.mSetting);
        console.log(content);

        content = this.mElectron.Encrypt(content);

        this.mElectron.WriteFileAsync(folder + "/" + this.mConfiFileName, content)
            .then(response => {
                console.log("file saved");
            })
            .catch(reason => {
                console.log("save setting failes. " + reason);
            });
    }

    private GetFolder(): string {
        return this.mElectron.App.getPath('userData');
    }
    private GetDefaultAccount(): BlogAccount {
        let defaultAccount: BlogAccount;

        try {            

            for (let account of this.Setting.BlogAccounts) {
                if (account.IsDefault) {
                    console.log(account);
                    defaultAccount = account;
                    break;
                }
            }
            if (!defaultAccount)
                defaultAccount = this.Setting.BlogAccounts[0];
        }
        catch (error) {
            console.log("get default account error. " + error);
        }
        return defaultAccount;
    }
}