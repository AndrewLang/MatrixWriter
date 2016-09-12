import {XmlRpcParameter}    from './XmlRpcParameter';
import * as Xml             from '../../common/Xml/index';

export class XmlRpcMethod {
    Name: string;
    Params: Array<XmlRpcParameter> = [];

    AddParameter(value: string): XmlRpcMethod {
        this.Params.push(new XmlRpcParameter(value));
        return this;
    }
    ToRequest(): XMLDocument {
        let doc = new Xml.XDocument();
        let root = new Xml.XElement("methodCall");
        doc.AppendChild(root);

        root.AppendChild(new Xml.XElement("methodName", this.Name))
        let params = new Xml.XElement("params");
        root.AppendChild(params);

        this.Params.forEach(function (param) {
            params.AppendChild(new Xml.XElement("param").AppendChild(new Xml.XElement("value", param.Value)));
        });

        return doc.Build();
    }
}