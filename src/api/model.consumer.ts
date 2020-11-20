import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { Model,Models } from '../models/jaqpot.models';
import { BaseConsumer } from './base.consumer';

export interface IModelConsumer{
    getPromiseWithPathId(id:string, token:string):Promise< Model >;
    getMyModels(authToken:string, min:Number, max:Number):Promise<Models>
}

export class ModelConsumer extends BaseConsumer<Model> implements IModelConsumer{

    private _client : AxiosInstance
    private _jaqpotPath:string;
    private _modelsPath:string = '/model/';

    constructor(_httpClient:AxiosInstance, _jaqpotBase:string){
            super(_httpClient, "model/", _jaqpotBase)
            this._client = _httpClient
            this._jaqpotPath = _jaqpotBase
            this._client = _httpClient
    }

    public getMyModels(authToken:string, min:Number, max:Number):Promise<Models>{

        let params = new URLSearchParams();
        params.set("min", min.toString());
        params.set("max", max.toString());

        let config = {
            params,
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '  + authToken
            }
        }

        return this._client.get(this._jaqpotPath + this._modelsPath, config).then(response => {
            
            let retJson: Models= {}
            retJson.total = Number(response.headers["total"]);
            retJson.models = response.data

            var promise = new Promise(function(resolve, reject) {
                resolve(retJson);
              });
            
              return promise;
          })

        }
} 
