import { FeatureConsumer } from "./api/feature.consumer";
import { Dataset, Feature, Model } from "./models/jaqpot.models";
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';


export interface IJaqpotClient{
    // predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>
    // getMyModels(token:string, authToken:string):Promise<Array<Model>>
    // getOrgsModels(organization:string, authToken:string):Promise<Array<Model>>
    getFeature(featId:string, authToken:string):Promise<Feature>
    // getDataset(id:string, authToken:string):Promise<Dataset>
}

export class JaqpotClient {

    private _basePath:string;
    private _client: AxiosInstance;
    private _featureConsumer:FeatureConsumer

    constructor(
        _jaqpotBase:string
        , axiosInstance:AxiosInstance
        , _featConsuner:FeatureConsumer
    ){
        this._basePath = _jaqpotBase
        this._client = axiosInstance
        this._featureConsumer = _featConsuner
    }

    // public predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>{

    // }
    // getMyModels(token:string, authToken:string):Promise<Array<Model>>
    // getOrgsModels(organization:string, authToken:string):Promise<Array<Model>>


    public getFeature(featId:string, authToken:string):Promise<Feature>{
        return this._featureConsumer.getPromiseWithPathId(featId, authToken)
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
        // const orgConsumer:OrganizationConsumer = new OrganizationConsumer(axiosC, basePath);
        this._client = new JaqpotClient(basePath, axiosC, featConsumer);
    }

    public getClient(){
        return this._client;
    }

}