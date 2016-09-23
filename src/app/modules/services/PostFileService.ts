import {Injectable}                 from '@angular/core';
import * as Common                  from '../../common/index';
import {ElectronService}            from './ElectronService';


@Injectable()
export class PostFileService {

    constructor(private electronService: ElectronService) { }

    Save(post: Common.PostFile, file: string): Promise<boolean> {
        if (!post)
            throw new Error("Given post is null.")
        if (!file)
            throw new Error("Given file is null");

        let content = JSON.stringify(post);
        return new Promise(function (resolve, reject) {
            this.electronService.WriteFileAsync(file, content)
                .then(response => { 
                    resolve(true);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    Load(file: string): Promise<Common.PostFile> {
        return new Promise(function (resolve, reject) {
            this.electronService.ReadFileAsync(file)
                .then(response => {
                    let postFile = JSON.parse(response);
                    resolve(postFile);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }
    
}