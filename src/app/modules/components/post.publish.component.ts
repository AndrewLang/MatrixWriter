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
        private metaweblogService: Services.MetaweblogService) {
        super();
    }

    CanSubmit(): boolean {
        return this.mCanSubmit;
    }
    UseCancel(): boolean {
        return false;
    }
    ngOnInit(): any {
        let post = this.postManageService.CurrentPost;
        let account = this.settingService.DefaultAccount;
        let xmlRpcRequest = new Common.XmlRpcRequest();
        let methods = new Common.MetaweblogMethods();

        post.DateCreated = Date.now().toString();
        post.DateModified = Date.now().toString();
        
        this.Title = "Publish";
        this.Status = "Publishing '" + post.Title + "' to blog '" + account.NickName + "'.";

        xmlRpcRequest.NewPost(account.ApiUrl, methods.NewPost("blogid", account.UserName, account.Password, post))
            .then(response => {
                console.log("Post published.")
                console.log(response);
                this.Status = "Publish success.";
                this.Finished = true;
                this.Success = true;
                this.mCanSubmit = true;
            })
            .catch(reason => {
                console.log("Publis post error: " + reason);
                this.Status = "Publish failed for " + reason;
                this.Finished = true;
                this.Failed = true;
                this.mCanSubmit = true;
            });
    }

}