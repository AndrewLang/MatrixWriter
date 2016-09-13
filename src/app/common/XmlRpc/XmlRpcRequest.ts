import {XmlRpcMethod}   from './XmlRpcMethod';
import {XmlRpcError}    from './XmlRpcError';
import {PostParser}     from './PostParser';
import * as Models      from '../models/index';
import {XmlRpcResponseMember}   from'./XmlRpcResponseMember';

export class XmlRpcRequest {
    self: XmlRpcRequest = this;
    mPostParser: PostParser = new PostParser();

    Send(url: string, method: XmlRpcMethod): Promise<any> {
        if (!method)
            throw new XmlRpcError();

        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            let request = method.ToRequest();
           
            xmlHttp.open("POST", url, true);
            xmlHttp.send(request);

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    //console.log("Response:")
                    //console.log(xmlHttp.response);
                    resolve(xmlHttp.responseXML);
                }
            };
        });
    }

    GetPost(url: string, method: XmlRpcMethod): Promise<Models.Post> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.Send(url, method).then(response => {
                //console.log(response);
                //resolve(self.ParseToPost(response));
                resolve(self.mPostParser.ParsePost(response));
            });
        });
    }

    GetRecentPosts(url: string, method: XmlRpcMethod): Promise<Array<Models.Post>> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.Send(url, method).then(response => {
                //console.log(response);
                //resolve(self.ParseToPost(response));
                resolve(self.mPostParser.ParsePosts(response));
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
                post.DateCreated = names[i].querySelector('value string').innerHTML;
            }
            else if (name == "title") {
                post.Title = names[i].querySelector('value, string').innerHTML;
            }
            else if (name == "description") {
                post.Description = names[i].querySelector('value, string').innerHTML;
            }
            else if (name == "categoiries") {

            }
            else if (name == "publish") {
                post.Publish = Boolean(names[i].querySelector('value boolean').innerHTML);
            }
        }
        console.log(names);
        return post;
    }
}