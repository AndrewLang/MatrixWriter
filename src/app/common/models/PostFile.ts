import {Post}   from './Post';

export class PostFile{
    static DefaultExtension = ".mpost";
    
    Name: string;
    FullName: string;
    CreatedDate: Date;

    IsPublished:boolean = false;
    PublishBlogName:string;
    BlogHomeUrl:string;
    Post:Post;

    
}