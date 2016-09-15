import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';

import * as Services                         from '../services/index';

@Component({
    templateUrl: 'src/views/account.create.html',
    providers: [Services.MetaweblogDetector]
})
export class CreateAccountComponent {
    Title: string;
    CurrentStep: number = 1;
    TotalSteps: number = 4;
    DetectProgress: number = 0;
    DetectTotal: number = 10;
    //HomeUrl: string;
    //UserName: string;
    //Password: string;
    ProcessState: string;
    BlogNickName: string = "nick name";
    Remember: boolean = true;
    Finished: boolean;
    SupportBlogs: Array<BlogService> = [new BlogService(1, "WordPress", true), new BlogService(2, "Google Blogger", false), new BlogService(3, "Other service", false)]
    SelectedBlogId: number = 1;
    Account: Services.BlogAccount = new Services.BlogAccount();

    constructor(private mRouter: Router, private mDetector: Services.MetaweblogDetector) {
        this.Title = "Add a blog account";
    }
    Next(): void {
        if (this.CurrentStep < this.TotalSteps)
            this.CurrentStep++;

        if (this.CurrentStep == 3)
            this.StartDetection();
    }
    CanGoNext(): boolean {
        if (this.CurrentStep == 2) {
            if (this.Account.HomeUrl && this.Account.UserName && this.Account.Password)
                return true;
            else
                return false;
        }
        else if (this.CurrentStep == 3) {
            return this.Finished;
        }
        return this.CurrentStep < this.TotalSteps;
    }
    Previous(): void {
        if (this.CurrentStep > 1)
            this.CurrentStep--;
    }
    CanGoPrevious(): boolean {
        return this.CurrentStep > 1;
    }
    Finish(): void {

        this.GoToWelcome();
    }
    CanFinish(): boolean {
        return this.CurrentStep == this.TotalSteps;
    }
    Cancel(): void {
        this.GoToWelcome();
    }
    GoToWelcome(): void {
        this.mRouter.navigate(['welcome']);
    }
    StartDetection(): void {
        this.mDetector.Detect(this.Account);
    }
}

export class BlogService {
    Id: number;
    Name: string;
    IsSelected: boolean = false;

    constructor(id: number, name: string, selected?: boolean) {
        this.Id = id;
        this.Name = name;
        this.IsSelected = selected;
    }
}
