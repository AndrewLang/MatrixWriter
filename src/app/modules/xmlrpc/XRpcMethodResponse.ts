import {XRpcData}   from './XRpcData';

export class XRpcMethodResponse {

    mParams: XRpcData[] = [];
  

    get Params() {
        return this.mParams;
    }
    set Params(value: XRpcData[]) {
        this.mParams = value;
    }

    Add<T>( value:T):XRpcMethodResponse{
        this.mParams.push( XRpcData.For( value));
        return this;
    }
}