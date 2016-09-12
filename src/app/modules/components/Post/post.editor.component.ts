import {Component, OnInit}          from '@angular/core';

import {DataService}                from '../../services/DataService';
import {MetaweblogService}          from '../../services/MetaweblogService';
import * as Xml                     from '../../../common/Xml/index';
import * as XmlRpc                  from '../../../common/XmlRpc/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/post-editor.html',
    providers: [DataService, MetaweblogService]
})
export class PostEditorComponent implements OnInit {
    postContent: string = "";

    constructor(private dataService: DataService, private metaWeblogService: MetaweblogService) {
        console.log('constructor of app Component');
    }


    ngOnInit(): any {
        let homeUrl: string = 'http://blog.sina.com.cn/andrewlang';
        this.dataService.Get(homeUrl, (response: any) => {
            var parser = new DOMParser()
            var doc = parser.parseFromString(response._body, "text/html");

            let rsdLink = doc.querySelector("link[title=RSD]").getAttribute("href");
            console.log(rsdLink);
            this.postContent = doc.head.innerHTML;// doc.documentElement.innerHTML;

            this.dataService.Get(rsdLink, (rsdResponse: any) => {

                let xml = parser.parseFromString(rsdResponse._body, "text/xml");
                let apiLink = xml.querySelector("service apis api").getAttribute("apiLink");
                console.log(apiLink);


                let methods = new XmlRpc.MetaweblogMethods();
                let request = methods.GetPost("7237185c0100luw2", "msn34cefe298081@sina.cn", "$supernova$");

                console.log(request);

             
                var rpcRequest = new XmlRpc.XmlRpcRequest();
                rpcRequest.Send(apiLink, request).then(response => {
                    console.log( "Respose for " + apiLink );
                    console.log(response);
                });
            });
        });
    }
}
