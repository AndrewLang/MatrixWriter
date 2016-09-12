
export class XmlBuilder {
    mXmlDoc: Document;

    beginDocument(): XmlBuilder {
        this.mXmlDoc = document.implementation.createDocument("", "", null);
        return this;
    }
    endDocument(): Document {
        return this.mXmlDoc;
    }
    createElement(name: string, value: string): XmlBuilder {
        let element = this.mXmlDoc.createElement(name);
        
        return this;
    }
}