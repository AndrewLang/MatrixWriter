import {XmlRpcMethod}   from './XmlRpcMethod';
import {XmlRpcError}    from './XmlRpcError';
import * as Models      from '../models/index';
import {XmlRpcResponseMember}   from'./XmlRpcResponseMember';

export class XmlRpcRequest {
    self: XmlRpcRequest = this;

    Send(url: string, method: XmlRpcMethod): Promise<any> {
        if (!method)
            throw new XmlRpcError();

        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", url, true);
            xmlHttp.send(method.ToRequest());
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    console.log(xmlHttp.response);
                    resolve(xmlHttp.responseXML);
                }
            };
        });
    }

    GetPost(url: string, method: XmlRpcMethod): Promise<Models.Post> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.Send(url, method).then(response => {
                console.log(response);
                resolve(self.ParseToPost(response));
            });
        });
    }

    ParseToPost(doc: XMLDocument): Models.Post {
        let post = new Models.Post();
        let nodes = doc.querySelector("methodResponse params param value struct");
        console.log(doc);
        console.log(nodes);
        let names = nodes.querySelectorAll("member");
        for (var i = 0; i < names.length; i++) {
            let name = names[i].querySelector('name').innerHTML;
            if (name == "postid") {
                post.PostId = names[i].querySelector('value string').innerHTML;
            }
            else if (name == "dateCreated") { 
                //post.DateCreated = new
            }
            else if (name == "title") { }
            else if (name == "description") { }
            else if (name == "categoiries") { }
            else if (name == "publish") { }

            console.log(names[i].querySelector('name').innerHTML);
            console.log(names[i].querySelector('value').innerHTML);
        }
        console.log(names);
        return post;
    }
}