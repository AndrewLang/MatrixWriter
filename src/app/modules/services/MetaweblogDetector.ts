
import { Injectable}    from '@angular/core';
import {Http, Headers}  from '@angular/http';
import 'rxjs/Rx';

import {Blog}           from './Blog';
import {BlogAccount}    from './BlogAccount'
import {IBlogDetector}  from './IBlogDetector';
import {DataService}    from './DataService';

@Injectable()
export class MetaweblogDetector implements IBlogDetector {


    constructor(private dataService: DataService) { }

    Detect(account: BlogAccount): Promise<Blog> {
        if (!this.dataService)
            throw new Error("Data server is not found.");

        let self = this;
        return new Promise(function (resolve, reject) {

            self.dataService.Get(account.HomeUrl, (response: any) => {
                var parser = new DOMParser()
                var doc = parser.parseFromString(response._body, "text/html");

                let title = doc.querySelector("title").innerHTML;
                if (title)
                    title = title.split(" ")[0];
                let rsdLink = doc.querySelector("link[title=RSD]").getAttribute("href");


                self.dataService.Get(rsdLink, (rsdResponse: any) => {
                    let xml = parser.parseFromString(rsdResponse._body, "text/xml");
                    let apiLink = xml.querySelector("service apis api[preferred='true']").getAttribute("apiLink");

                    if (!apiLink)
                        apiLink = xml.querySelector("service apis api").getAttribute("apiLink");

                    var blog = new Blog();
                    blog.HomeUrl = account.HomeUrl;
                    blog.ApiUrl = apiLink;
                    blog.XmlRpc = rsdLink;
                    blog.BlogName = title;

                    resolve(blog);
                });
            });

        });

    }
}