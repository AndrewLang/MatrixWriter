import {Component, OnInit}          from '@angular/core';

import {DataService}                from '../../services/DataService';

@Component({
    selector: 'app',
    templateUrl: 'src/views/post-editor.html',
    providers: [DataService]
})
export class PostEditorComponent implements OnInit {
    postContent: string = "";

    constructor(private dataService: DataService) {
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

                let xmlDoc = document.implementation.createDocument("", "", null);
                //let declarationNode = document.implementation.
                let root = xmlDoc.createElement("methodCall");
                let nameNode = xmlDoc.createElement("methodName")
                nameNode.nodeValue = "metaWeblog.getRecentPosts";
                root.appendChild(nameNode);
                nameNode.appendChild(xmlDoc.createTextNode("metaWeblog.getRecentPosts"));


                let paramsNode = xmlDoc.createElement("params");
                let idNode = xmlDoc.createElement("param");
                let idValue = xmlDoc.createElement("value");
                idValue.nodeValue = "1916213340";
                idValue.appendChild(xmlDoc.createTextNode("1916213340"));
                idNode.appendChild(idValue);
                paramsNode.appendChild(idNode);
                root.appendChild(paramsNode);

                let userNode = xmlDoc.createElement("param");
                let userValue = xmlDoc.createElement("value");
                userValue.innerText = "msn34cefe298081@sina.cn";
                userValue.appendChild(xmlDoc.createTextNode("msn34cefe298081@sina.cn"));
                userNode.appendChild(userValue);
                paramsNode.appendChild(userNode);

                let pwdNode = xmlDoc.createElement("param");
                let pwdValue = xmlDoc.createElement("value");
                pwdValue.nodeValue = "$supernova$";
                pwdValue.appendChild(xmlDoc.createTextNode("$supernova$"));
                pwdNode.appendChild(pwdValue);
                paramsNode.appendChild(pwdNode);

                let countNode = xmlDoc.createElement("param");
                let countValue = xmlDoc.createElement("value");
                countValue.nodeValue = "100";
                countValue.appendChild(xmlDoc.createTextNode("100"));
                countNode.appendChild(countValue);
                paramsNode.appendChild(countNode);



                xmlDoc.appendChild(root);

                console.log(xmlDoc);

                let xmlText = `<?xml version="1.0"?>
                <methodCall>
                    <methodName>metaWeblog.getPost</methodName>
                    <params>
                        <param>
                            <value>7237185c0100luw2</value>
                        </param>
                        <param>
                            <value>msn34cefe298081@sina.cn</value>
                        </param>
                        <param>
                            <value>$supernova$</value>
                        </param>
                    </params>
                </methodCall>
                `;
                let xmlrequest = parser.parseFromString( xmlText, "text/xml" );

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                        console.log(xmlhttp.responseText);
                    }
                }
                xmlhttp.open("POST", "http://upload.move.blog.sina.com.cn/blog_rebuild/blog/xmlrpc.php", true);
                xmlhttp.send(xmlrequest);

                // this.dataService.Post(node, xmlDoc, (apiResponse: any) => {
                //     console.log(apiResponse);
                // });
           });
        });
    }
}
