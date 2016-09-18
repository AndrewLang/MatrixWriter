import {Injectable} from '@angular/core';

declare var electron: any;
// declare var storage: any;
declare var fs: any;

@Injectable()
export class ElectronService {
    get Electron(): any {
        return electron;
    }
    get App(): any {
        return electron.remote.app;
    }
    get MainMenu(): any {
        return electron.remote.Menu;
    }

    SetApplicationMenu(menu: any): void {
        electron.remote.Menu.setApplicationMenu(menu);
    }

    OpenExternal(url: string): void {
        electron.remote.shell.openExternal(url);
    }
    ShowItemInFolder( path: string ): void {
        electron.remote.shell.showItemInFolder( path );
    }

    // ReadFile(path: string): any {
    //     return storage.get(path);
    // }
    // WriteFile(path: string, data): any {
    //     return storage.set(path, data);
    // }
    // IsPathExist(path: string): boolean {
    //     return storage.isPathExists(path);
    // }
    // Remove(path: string): any {
    //     return storage.remove(path);
    // }

    ReadFileAsync(file: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            fs.readFile(file, (error, data) => {
                if (error)
                    reject(error);
                resolve(data);
            });
        });
    }

    WriteFileAsync(file: string, data: any): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            fs.writeFile(file, data, (error) => {
                if (error)
                    reject(error);

                resolve(null);

                //self.ShowItemInFolder( file );
            });
        });
    }
}