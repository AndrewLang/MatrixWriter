import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';
import * as Common                           from '../../common/index';
import * as Services                         from '../services/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/welcome.html',
    providers: [Services.SettingService]
})
export class WelcomeComponent implements OnInit, OnDestroy {

    private mSelectAccount: Services.BlogAccount;

    constructor(private mRouter: Router, private mSettingService: Services.SettingService) {

    }

    get Accounts(): Services.BlogAccount[] {
        return this.mSettingService.Setting.BlogAccounts;
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
                this.SelectAccount = this.mSettingService.Setting.BlogAccounts[0];
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