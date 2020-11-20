import { FeatureConsumer } from "./api/feature.consumer";
import { Dataset, Feature, Model, Models } from "./models/jaqpot.models";
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { ModelConsumer } from "./api/model.consumer";


export interface IJaqpotClient{
    // predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>
    getModelById(modelId:string, authToken:string):Promise<Model>
    getMyModels(authToken:string, min:Number, max:Number):Promise<Models>
    // getOrgsModels(organization:string, authToken:string):Promise<Array<Model>>
    getFeature(featId:string, authToken:string):Promise<Feature>
    // getDataset(id:string, authToken:string):Promise<Dataset>
}

export class JaqpotClient implements IJaqpotClient{

    private _basePath:string;
    private _client: AxiosInstance;
    private _featureConsumer:FeatureConsumer
    private _modelConsumer:ModelConsumer

    constructor(
        _jaqpotBase:string
        , axiosInstance:AxiosInstance
        , _featConsuner:FeatureConsumer
        , _modelConsumer:ModelConsumer
    ){
        this._basePath = _jaqpotBase
        this._client = axiosInstance
        this._featureConsumer = _featConsuner
        this._modelConsumer = _modelConsumer
    }

    // public predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>{

    // }
    // getMyModels(token:string, authToken:string):Promise<Array<Model>>
    // getOrgsModels(organization:string, authToken:string):Promise<Array<Model>>


    public getFeature(featId:string, authToken:string):Promise<Feature>{
        return this._featureConsumer.getPromiseWithPathId(featId, authToken)
    }

    public getModelById(modelId:string, authToken:string):Promise<Feature>{
        return this._modelConsumer.getPromiseWithPathId(modelId, authToken)
    }

    public getMyModels(authToken:string, min:Number, max:Number):Promise<Models>{

        return this._modelConsumer.getMyModels(authToken, min, max)
    }
    // getDataset(id:string, authToken:string):Promise<Dataset>

}


export class JaqpotClientFactory{
    
    private _client:IJaqpotClient

    constructor(basePath:string){
        const config: AxiosRequestConfig = {
            baseURL: basePath,
        };
        const axiosC: AxiosInstance = axios.create(config);
        const featConsumer:FeatureConsumer = new FeatureConsumer(axiosC, basePath);
        const modelConsumer:ModelConsumer = new ModelConsumer(axiosC, basePath);
      
        this._client = new JaqpotClient(basePath, axiosC, featConsumer, modelConsumer);
    }

    public getClient(){
        return this._client;
    }

}