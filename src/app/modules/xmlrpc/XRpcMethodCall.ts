import {XRpcData}   from './XRpcData';

export class XRpcMethodCall {

    mMethodName: string;
    mParams: XRpcData[] = [];

    get MethodName() {
        return this.mMethodName;
    }
    set MethodName(value: string) {
        this.mMethodName = value;
    }

    get Params() {
        return this.mParams;
    }
    set Params(value: XRpcData[]) {
        this.mParams = value;
    }
}