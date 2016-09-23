import {Post}       from './Post';
import {BlogInfo}   from './BlogInfo';

export class PostFile{
    static DefaultExtension = ".mpost";
    
    PostTitle: string;
    CreatedDate: Date;

    IsPublished:boolean = false;
    BlogInfo : BlogInfo;
    Post:Post = new Post();
}