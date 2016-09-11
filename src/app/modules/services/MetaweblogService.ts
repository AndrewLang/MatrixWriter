import { Injectable} from '@angular/core';

//const xmlrpc = require('xmlrpc');

@Injectable()
export class MetaweblogService {

    mClient: any;

    constructor() {
        //this.mClient = xmlrpc.createClient({});
    }

    methodCall(methodName, params) {
        return new Promise(function (resolve, reject) {
            this.mClient.methodCall(methodName, params, function (error, data) {
                if (!error) {
                    resolve(data);
                } else {
                    reject(error);
                }
            });
        });
    }

    getUsersBlogs (appKey, username, password) {
        return this.methodCall('blogger.getUsersBlogs', [appKey, username, password]);
    }
    getRecentPosts (blogid, username, password, numberOfPosts) {
        return this.methodCall('metaWeblog.getRecentPosts', [blogid, username, password, numberOfPosts]);
    }
    getCategories (blogid, username, password) {
        return this.methodCall('metaWeblog.getCategories', [blogid, username, password]);
    }
    getPost (postid, username, password) {
        return this.methodCall('metaWeblog.getPost', [postid, username, password]);
    } 
    editPost (postid, username, password, post, publish) {
        return this.methodCall('metaWeblog.editPost', [postid, username, password, post, publish]);
    }
    newPost (blogid, username, password, post, publish) {
        return this.methodCall('metaWeblog.newPost', [blogid, username, password, post, publish]);
    }
    deletePost (appKey, postid, username, password, publish) {
        return this.methodCall('blogger.deletePost', [appKey, postid, username, password, publish]);
    }
    newMediaObject (blogid, username, password, mediaObject) {
        return this.methodCall('metaWeblog.newMediaObject', [blogid, username, password, mediaObject]);
    }
}