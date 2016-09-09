
export class XRpcData {
    private mValue: any;
    private mType: string;

    get Value(): any {
        return this.mValue;
    }
    set Value(value: any) {
        this.mValue = value;
    }

    get Type(): string {
        return this.mType;
    }
    set Type(value: string) {
        this.mType = value;
    }

    public static For<T>(t: T): XRpcData {
        let data = new XRpcData();
        data.Value = t;
        return data;
    } 
}


