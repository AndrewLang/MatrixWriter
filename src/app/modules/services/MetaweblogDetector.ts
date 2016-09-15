

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

    Detect(account: BlogAccount): Promise<Array<Blog>> {
        if (!this.dataService)
            throw new Error("Data server is not found.");

        let self = this;
        return new Promise(function (resolve, reject) {
            let blogs: Array<Blog> = [];

            self.dataService.Get(account.HomeUrl, (response: any) => {
                var parser = new DOMParser()
                var doc = parser.parseFromString(response._body, "text/html");

                let rsdLink = doc.querySelector("link[title=RSD]").getAttribute("href");
                console.log("RSD Link: " + rsdLink);

                self.dataService.Get(rsdLink, (rsdResponse: any) => {
                    let xml = parser.parseFromString(rsdResponse._body, "text/xml");
                    let apiLink = xml.querySelector("service apis api").getAttribute("apiLink");

                    console.log("Api link " + apiLink);

                    var blog = new Blog();
                    blog.HomeUrl = account.HomeUrl;
                    blog.ApiUrl = apiLink;
                    blog.XmlRpc = rsdLink;

                    blogs.push(blog);
                });
            });

            resolve(blogs);
        });

    }
}