import {XRpcData}   from './XRpcData';

export class XRpcArray {
    private mData: Array<XRpcData> = [];

    get Data() {
        return this.mData;
    }
    set Data(value:Array<XRpcData>){
        this.mData = value;
    }

    Add<T>( value:T ):XRpcArray{
        this.mData.push( XRpcData.For(value));
        return this;
    }
}