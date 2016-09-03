import {Component, OnInit}          from '@angular/core';
import {HtmlEditorDirective}        from '../../../directives/HtmlEditorDirective';


@Component({
    selector: 'app',
    templateUrl: 'src/views/post-editor.html',
    directives: [HtmlEditorDirective]
})
export class PostEditorComponent implements OnInit {
    postContent: string = "";

    constructor() {
        console.log('constructor of app Component');
    }


    ngOnInit(): any {
        var temp = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus sem quam, quis finibus leo pretium sit amet. Sed imperdiet venenatis enim at sagittis. Praesent porta purus nec aliquet pellentesque. Nunc bibendum urna non risus lacinia, at venenatis
                    nisl interdum. Duis porta tristique augue vel dictum. Curabitur feugiat tincidunt risus eget semper. Aliquam quis cursus nibh, feugiat commodo arcu. Aliquam non dolor vel ex dapibus interdum vitae nec lorem. Phasellus fermentum neque ut nibh hendrerit
                    tempus. Pellentesque sit amet ligula dui. Donec laoreet est erat. Etiam aliquet sem sit amet quam tempus aliquam. Vivamus eleifend nunc ipsum, a viverra neque efficitur at. Duis mi nisl, accumsan quis ex et, aliquam lobortis lectus. Vestibulum luctus
                    diam eu mattis gravida. Quisque nisi felis, posuere vitae purus sit amet, pellentesque fermentum enim.</p>`;

        let max: number = 10;
        while (max > 0) {
            this.postContent += temp;
            max--;
        }
    }
}
