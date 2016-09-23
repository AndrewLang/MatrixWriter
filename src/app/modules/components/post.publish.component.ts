import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit }          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {ModalBase}                  from './ModalBase';


@Component({
    templateUrl: 'src/views/post-publish.html',
})
export class PostPublishComponent extends ModalBase implements OnInit {
    Status: string;
    Finished: boolean = false;
    Success: boolean;
    Failed: boolean;
    mCanSubmit: boolean = false;

    constructor(private settingService: Services.SettingService,
        private postManageService: Services.PostManageService,
        private metaweblogService: Services.MetaweblogService,
        private electronService: Services.ElectronService,
        private postFileService: Services.PostFileService) {
        super();
    }

    CanSubmit(): boolean {
        return this.mCanSubmit;
    }
    UseCancel(): boolean {
        return false;
    }
    ngOnInit(): any {
        let file = this.postManageService.CurrentPost;
        let account = this.settingService.DefaultAccount;
        let xmlRpcRequest = new Common.XmlRpcRequest();
        let methods = new Common.MetaweblogMethods();

        let now = Date.now().toString();
        file.Post.DateCreated = now;
        file.Post.DateModified = now;
        file.PostTitle = file.Post.Title;
        if(!file.CreatedDate)
            file.CreatedDate = now;

        this.Title = "Publish";
        this.Status = "Publishing '" + file.Post.Title + "' to blog '" + account.NickName + "'.";

        xmlRpcRequest.NewPost(account.ApiUrl, methods.NewPost("blogid", account.UserName, account.Password, file.Post))
            .then(response => {
                console.log("Post published.")
                console.log(response);
                file.IsPublished = true;
                this.postFileService.Save(file)
                    .then(response => { })
                    .catch(reason => console.log(reason));

                this.Status = "Publish success.";
                this.Finished = true;
                this.Success = true;
                this.mCanSubmit = true;

                this.electronService.OpenExternal(account.HomeUrl);
            })
            .catch(reason => {
                console.log("Publis post error: " + reason);
                this.postFileService.Save(file);
                this.Status = "Publish failed for " + reason;
                this.Finished = true;
                this.Failed = true;
                this.mCanSubmit = true;
            });
    }

}