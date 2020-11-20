import axios, { AxiosAdapter, AxiosInstance } from 'axios';

export class BaseConsumer < T > {

    private _basePath:string;
    private _path:string;

    constructor(
        private _httpClient:AxiosInstance,
        protected _requestPath: string,
        protected _accountsBase: string
    ){
        this._httpClient = _httpClient
        this._basePath = _accountsBase
        this._path = this._basePath + "/" + _requestPath;
    }


    public getPromiseWithParams(params:URLSearchParams, token:string):Promise< T >{
        let config = {
            params,
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '  + token
            }
        }
        return this._httpClient.get(this._path, config ).then(resp=>{
            return resp.data
        })
    }

    public getPromiseWithPathId(id:string, token:string):Promise<T>{
        let config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '  + token
            }
        }
        return this._httpClient.get(this._path + id, config).then(resp=>{
            return resp.data
        })
    }

    public getWithIdSearchParam(id:string, token:string):Promise<T>{
        let params = new URLSearchParams();
        params.set('id', id);
        params.set("min", "");
        params.set("max", "");
        params.set("email", "");
        let config = {
            params,
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '  + token
            }
        }
        return this._httpClient.get(this._path, config ).then(resp=>{
            return resp.data[0]
        })
    }

    // public 

}