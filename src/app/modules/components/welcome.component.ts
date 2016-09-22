import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';
import * as Common                           from '../../common/index';
import * as Services                         from '../services/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/welcome.html'
})
export class WelcomeComponent implements OnInit, OnDestroy {

    private mSelectAccount: Services.BlogAccount;
    mAccounts: Services.BlogAccount[];
    RecentPosts: Services.PostFile[] = [];

    constructor(private mRouter: Router, private mSettingService: Services.SettingService) {

    }

    get Accounts(): Services.BlogAccount[] {
        return this.mAccounts;// this.mSettingService.Setting.BlogAccounts;
    }
    get SelectAccount(): Services.BlogAccount {
        return this.mSelectAccount;
    }
    set SelectAccount(value: Services.BlogAccount) {
        this.mSelectAccount = value;
    }

    ngOnInit() {
        this.mSettingService.LoadSettings()
            .then(response => {
                console.log(response);
                console.log(this.mSettingService.Setting);
                this.mAccounts = this.mSettingService.Setting.BlogAccounts;
                this.SelectAccount = this.mSettingService.DefaultAccount;
                this.RecentPosts = this.mSettingService.Setting.RecentPosts;

                console.log(this.mAccounts);
                console.log(this.SelectAccount);
            });

    }
    ngOnDestroy() {

    }

    CreatePost() {
        this.mRouter.navigate(['editor']);
    }
    OpenPost() {

    }
    CreateAccount() {
        this.mRouter.navigate(['createAccount']);
    }
}