import {Component, OnInit}          from '@angular/core';
import {HtmlEditorDirective}        from '../../../directives/HtmlEditorDirective';
import {DataService}                from '../../services/DataService';

@Component({
    selector: 'app',
    templateUrl: 'src/views/post-editor.html',
    providers: [DataService],
    directives: [HtmlEditorDirective]
})
export class PostEditorComponent implements OnInit {
    postContent: string = "";

    constructor(private dataService: DataService) {
        console.log('constructor of app Component');
    }


    ngOnInit(): any {
        this.dataService.Get('http://blog.sina.com.cn/u/1916213340', (response: any) => {
            var parser = new DOMParser()
            var doc = parser.parseFromString(response._body, "text/html");

            let rsdLink = doc.querySelector("link[title=RSD]").getAttribute("href");
            console.log(rsdLink);
            this.postContent = doc.head.innerHTML;// doc.documentElement.innerHTML;

            this.dataService.Get(rsdLink, (rsdResponse: any) => {
                console.log(rsdResponse);
                let xml = parser.parseFromString( rsdResponse._body, "text/xml");
                console.log( xml );
            });
        });
    }
}
