
import { Injectable}    from '@angular/core';
import {Http, Headers}  from '@angular/http';
import 'rxjs/Rx';

import {Blog}           from './Blog';
import {BlogAccount}    from './BlogAccount'
import {IBlogDetector}  from './IBlogDetector';
import {DataService}    from './DataService';
import {LogService}     from './LogService';

@Injectable()
export class MetaweblogDetector implements IBlogDetector {


    constructor(private dataService: DataService,
        private logService: LogService) { }

    Detect(account: BlogAccount): Promise<Blog> {
        if (!this.dataService)
            throw new Error("Data server is not found.");

        let self = this;
        let parser = new DOMParser();
        let blog = new Blog();
        blog.HomeUrl = account.HomeUrl;

        let rsdLink = "";
        let title = "";
        return new Promise(function (resolve, reject) {
            console.log("start Detect");
            self.dataService.GetAsync(account.HomeUrl)
                .then(response => {
                    self.logService.Log('process document', response);

                    var doc = parser.parseFromString(response._body, "text/html");

                    title = doc.querySelector("title").innerHTML;
                    if (title)
                        title = title.split(" ")[0];
                    rsdLink = doc.querySelector("link[title=RSD]").getAttribute("href");

                    self.logService.Log('RSD link ', rsdLink);

                    blog.XmlRpc = rsdLink;
                    blog.BlogName = title;

                    return self.dataService.GetAsync(rsdLink);
                })
                .then(response => {
                    self.logService.Log('process RSD response', response);

                    let xml = parser.parseFromString(response._body, "text/xml");
                    let apiLink = xml.querySelector("service apis api[preferred='true']").getAttribute("apiLink");

                    if (!apiLink)
                        apiLink = xml.querySelector("service apis api").getAttribute("apiLink");

                    blog.ApiUrl = apiLink;

                    return self.dataService.GetAsync(rsdLink);
                })
                .then(response => {

                    resolve(blog);
                })
                .catch(error => {
                    self.logService.LogMessage(error);
                    reject(error);
                });

            // self.dataService.Get(account.HomeUrl, (response: any) => {
            //     var parser = new DOMParser()
            //     var doc = parser.parseFromString(response._body, "text/html");

            //     let title = doc.querySelector("title").innerHTML;
            //     if (title)
            //         title = title.split(" ")[0];
            //     let rsdLink = doc.querySelector("link[title=RSD]").getAttribute("href");


            //     self.dataService.Get(rsdLink, (rsdResponse: any) => {
            //         let xml = parser.parseFromString(rsdResponse._body, "text/xml");
            //         let apiLink = xml.querySelector("service apis api[preferred='true']").getAttribute("apiLink");

            //         if (!apiLink)
            //             apiLink = xml.querySelector("service apis api").getAttribute("apiLink");

            //         var blog = new Blog();
            //         blog.HomeUrl = account.HomeUrl;
            //         blog.ApiUrl = apiLink;
            //         blog.XmlRpc = rsdLink;
            //         blog.BlogName = title;

            //         resolve(blog);
            //     });
            // });

        });

    }
}