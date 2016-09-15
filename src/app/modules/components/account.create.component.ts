import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';

@Component({
    templateUrl: 'src/views/account.create.html'
})
export class CreateAccountComponent {
    Title: string;
    CurrentStep: number = 1;
    TotalSteps: number = 4;

    constructor(private mRouter: Router) {
        this.Title = "Add a blog account";
    }
    Next(): void {
        if (this.CurrentStep < this.TotalSteps)
            this.CurrentStep++;

    }
    CanGoNext(): boolean {
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
        this.mRouter.navigate(['welcome']);
    }
    CanFinish(): boolean {
        return this.CurrentStep == this.TotalSteps;
    }
    Cancel(): void {
        this.mRouter.navigate(['welcome']);
    }
}

export class ActionStep {
    Name: string;
    IsActive: boolean = false;
}
