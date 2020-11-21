import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { Doa } from '../models/jaqpot.models';
import { BaseConsumer } from './base.consumer';

export interface IDoaConsumer{
    getModelsDoa(id:string, token:string):Promise< Doa >;
}

export class DoaConsumer extends BaseConsumer<Doa> implements IDoaConsumer{

    _client:AxiosInstance
    _jaqpotBase:string
    _doaPath:string = 'doa/'

    constructor(_httpClient:AxiosInstance, _jaqpotBase:string){
            super(_httpClient, "doa/", _jaqpotBase)
            this._client = _httpClient,
            this._jaqpotBase = _jaqpotBase
    }

    public getModelsDoa(modelId:string, token:string):Promise<Doa>{
        let params = new URLSearchParams();
        params.set("hasSources", modelId);
        let config = {
            params,
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '  + token
            }
        }
        return this._client.get(this._jaqpotBase + this._doaPath, config ).then(resp=>{
            return resp.data
        })
    }

} 