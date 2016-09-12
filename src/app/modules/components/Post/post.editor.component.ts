import {Component, OnInit}          from '@angular/core';

import {DataService}                from '../../services/DataService';
import {MetaweblogService}          from '../../services/MetaweblogService';
import * as Xml                     from '../../../common/Xml/index';

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
                let node = xml.querySelector("service apis api").getAttribute("apiLink");
                console.log(node);

                let builder = new Xml.XDocument();
                let xmlRequestDoc = new Xml.XDocument()
                    .AppendChild(
                    new Xml.XElement("methodCall")
                        .AppendChild(new Xml.XElement("methodName", "metaWeblog.getPost"))
                        .AppendChild(new Xml.XElement("params")
                            .AppendChild(new Xml.XElement("param").AppendChild(new Xml.XElement("value", "7237185c0100luw2")))
                            .AppendChild(new Xml.XElement("param").AppendChild(new Xml.XElement("value", "msn34cefe298081@sina.cn")))
                            .AppendChild(new Xml.XElement("param").AppendChild(new Xml.XElement("value", "$supernova$")))
                        ))
                    .Build();


                console.log(xmlRequestDoc);

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                        console.log(xmlhttp.responseText);
                    }
                }
                xmlhttp.open("POST", "http://upload.move.blog.sina.com.cn/blog_rebuild/blog/xmlrpc.php", true);
                xmlhttp.send(xmlRequestDoc);
            });
        });
    }
}
