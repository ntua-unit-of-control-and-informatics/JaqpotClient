import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { Feature, Dataset } from '../models/jaqpot.models';
import { BaseConsumer } from './base.consumer';

export interface IDatasetConsumer{
    getPromiseWithPathId(id:string, authToken:string):Promise< Feature >;
    postDataset(data:Dataset, authToken:string):Promise< Dataset >;
}

export class DatasetConsumer extends BaseConsumer<Feature> implements IDatasetConsumer{

    private _client : AxiosInstance
    private _jaqpotPath:string;

    constructor(_httpClient:AxiosInstance, _jaqpotBase:string){
            super(_httpClient, "dataset/", _jaqpotBase)
            this._client = _httpClient
            this._jaqpotPath = _jaqpotBase
    }

    public postDataset(data:Dataset, authToken:string):Promise< Dataset >{
        let config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '  + authToken
            }
        }
        return this._client.post(this._jaqpotPath + "/dataset/", data, config )
    }

} 