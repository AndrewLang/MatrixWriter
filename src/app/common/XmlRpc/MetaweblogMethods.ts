import {XmlRpcMethod}   from './XmlRpcMethod';
import * as Models      from '../models/index';

export class MetaweblogMethods {

    GetPost(postId: string, user: string, password: string): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.getPost";
        method.AddParameter(postId)
            .AddParameter(user)
            .AddParameter(password);
        return method;
    }

    GetRecentPosts(blogId: string, user: string, password: string, numberoOfPosts?: number): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.getRecentPosts";
        method.AddParameter(blogId)
            .AddParameter(user)
            .AddParameter(password);

        if (numberoOfPosts)
            method.AddParameter(numberoOfPosts.toString());

        return method;
    }

    GetUserInfo(id: string, user: string, password: string): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.getPost";
        method.AddParameter(id)
            .AddParameter(user)
            .AddParameter(password)
            ;
        return method;
    }

    NewPost(blogId: string, user: string, password: string, post: Models.Post): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.newPost";
        method.AddParameter(blogId)
            .AddParameter(user)
            .AddParameter(password)
            ;
        return method;
    }
    EditPost(postId: string, user: string, password: string, post: Models.Post, publish: boolean): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.editPost";
        method.AddParameter(postId)
            .AddParameter(user)
            .AddParameter(password);
        return method;
    }
    DeletePost(appKey: string, postId: string, user: string, password: string, publish: boolean): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.deletePost";
        method.AddParameter(postId)
            .AddParameter(user)
            .AddParameter(password);
        return method;
    }
    GetCategories(blogId: string, user: string, password: string) {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.getCategories";
        method.AddParameter(blogId)
            .AddParameter(user)
            .AddParameter(password);
        return method;
    }
    NewMediaObject(blogId: string, user: string, password: string) {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.newMediaObject";
        method.AddParameter(blogId)
            .AddParameter(user)
            .AddParameter(password);
        return method;
    }
    GetUserBlogs(appKey: string, user: string, password: string): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.newMediaObject";
        method.AddParameter(appKey)
            .AddParameter(user)
            .AddParameter(password);
        return method;
    }
}