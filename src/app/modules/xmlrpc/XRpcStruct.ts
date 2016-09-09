
import {XRpcData}   from './XRpcData';

export class XRpcStruct {
    private mMembers: { [name: string]: XRpcData } = {};

    get Members() {
        return this.mMembers;
    }
    set Members(value: { [name: string]: XRpcData }) {
        this.mMembers = value;
    }

    public Set<T>(name: string, value: T): XRpcStruct {
        this.mMembers[name] = XRpcData.For<T>(value);
        return this;
    }
    public Optional<T>(name: string): T {
        let data: XRpcData;
        if (this.mMembers[name])
            data = this.mMembers[name];

        if (data)
            return data.Value;
        else
            return null;
    }
}