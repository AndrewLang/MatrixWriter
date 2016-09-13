import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';


@Component({
    selector: 'app',
    templateUrl: 'src/views/welcome.html',
})
export class WelcomeComponent implements OnInit, OnDestroy {

    constructor(private mRouter:Router) {

    }

    ngOnInit() {

        document.querySelector('#about-modal').classList.add('is-shown');

        let demoBtns = document.querySelectorAll('.js-container-target')
        // Listen for demo button clicks
        Array.prototype.forEach.call(demoBtns, function (btn: any) {
            btn.addEventListener('click', function (event: any) {
                event.target.parentElement.classList.toggle('is-open')
            });
        });
    }
    ngOnDestroy() {

    }

    CreateNewSequence(){
        console.log("Go to editor");
        this.mRouter.navigate(['editor']);
    }
}