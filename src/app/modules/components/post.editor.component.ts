import {Component, OnInit}          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/post-editor.html',
    providers: [Services.DataService, Services.MetaweblogService,Services.HtmlEditorService]
})
export class PostEditorComponent implements OnInit {
    postContent: string = "";

    constructor(private dataService: Services.DataService, private metaWeblogService: Services.MetaweblogService,
        private editorService: Services.HtmlEditorService) {
        console.log('constructor of post editor Component');
    }


    ngOnInit(): any {
        this.editorService.InitializeEditor("div.htmlEditor");
        let homeUrl: string = 'https://andylangyu.wordpress.com/';//'http://blog.sina.com.cn/andrewlang';
        this.dataService.Get(homeUrl, (response: any) => {
            var parser = new DOMParser()
            var doc = parser.parseFromString(response._body, "text/html");

            let rsdLink = doc.querySelector("link[title=RSD]").getAttribute("href");
            console.log("RSD Link: " + rsdLink);

            this.postContent = doc.head.innerHTML;

            this.dataService.Get(rsdLink, (rsdResponse: any) => {

                let xml = parser.parseFromString(rsdResponse._body, "text/xml");
                let apiLink = xml.querySelector("service apis api").getAttribute("apiLink");
                console.log("API Link: " + apiLink);


                let methods = new Common.MetaweblogMethods();
                //let request = methods.GetPost("7237185c0100luw2", "msn34cefe298081@sina.cn", "$supernova$");
                //let request = methods.GetPost("1", "nnlyx@hotmail.com", "supernova");
                let request = methods.GetRecentPosts("1", "nnlyx@hotmail.com", "supernova", 100);

                console.log("Request:");
                console.log(request);


                var rpcRequest = new Common.XmlRpcRequest();
                rpcRequest.GetRecentPosts(apiLink, request)
                    .then(response => {
                        console.log("Respose for " + apiLink);
                        console.log(response);
                    });
            });
        });
    }
}
