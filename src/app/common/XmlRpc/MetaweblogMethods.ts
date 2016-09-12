import {XmlRpcMethod} from './XmlRpcMethod';

export class MetaweblogMethods {

    public  GetPost(id: string, user: string, password: string): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.getPost";
        method.AddParameter(id)
            .AddParameter(user)
            .AddParameter(password);
        return method;
    }

}