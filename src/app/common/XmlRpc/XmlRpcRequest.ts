import {XmlRpcMethod} from './XmlRpcMethod';
import {XmlRpcError}    from './XmlRpcError';

export class XmlRpcRequest {

    Send(url: string, method: XmlRpcMethod): Promise<any> {
        if (!method)
            throw new XmlRpcError();

        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", url, true);
            xmlHttp.send(method.ToRequest());
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    resolve(xmlHttp.responseXML);
                }
            };
        });

    }
}