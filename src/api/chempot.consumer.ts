import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { Task, Chempot } from '../models/jaqpot.models';
import { BaseConsumer } from './base.consumer';

export interface IChempotConsumer{
    chempot(chempot:Chempot, token:string):Promise< Task >;
}

export class ChempotConsumer extends BaseConsumer<Task> implements IChempotConsumer{

    private _client : AxiosInstance
    private _jaqpotPath:string;
    private _chempotPath:string = '/chempot/';
    
    constructor(_httpClient:AxiosInstance, _jaqpotBase:string){
            super(_httpClient, "chempot/", _jaqpotBase)
            this._client = _httpClient
            this._jaqpotPath = _jaqpotBase
    }

    public chempot(chempot:Chempot ,authToken:string):Promise<Task>{
        let config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }
        return this._client.post(this._jaqpotPath + this._chempotPath, chempot, config)
    }

} 