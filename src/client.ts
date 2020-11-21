import { FeatureConsumer } from "./api/feature.consumer";
import { DatasetConsumer } from "./api/dataset.consumer";
import { TaskConsumer } from "./api/task.consumer";
import { Dataset, Feature, Model, Task } from "./models/jaqpot.models";
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';


export interface IJaqpotClient{
    // predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>
    // getMyModels(token:string, authToken:string):Promise<Array<Model>>
    // getOrgsModels(organization:string, authToken:string):Promise<Array<Model>>
    getFeature(featId:string, authToken:string):Promise<Feature>
    getDataset(id:string, authToken:string):Promise<Dataset>
}

export class JaqpotClient implements IJaqpotClient{

    private _basePath:string;
    private _client: AxiosInstance;
    private _featureConsumer:FeatureConsumer
    private _datasetConsumer:DatasetConsumer
    private _taskConsumer:TaskConsumer

    constructor(
        _jaqpotBase:string
        , axiosInstance:AxiosInstance
        , _featConsuner:FeatureConsumer
        , _datasetConsumer:DatasetConsumer
        , _taskConsumer:TaskConsumer
    ){
        this._basePath = _jaqpotBase
        this._client = axiosInstance
        this._featureConsumer = _featConsuner
        this._datasetConsumer = _datasetConsumer
        this._taskConsumer = _taskConsumer
    }

    // public predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>{

    // }
    // getMyModels(token:string, authToken:string):Promise<Array<Model>>
    // getOrgsModels(organization:string, authToken:string):Promise<Array<Model>>


    public getFeature(featId:string, authToken:string):Promise<Feature>{
        return this._featureConsumer.getPromiseWithPathId(featId, authToken)
    }

    public getDataset(id:string, authToken:string):Promise<Dataset>{
        return this._datasetConsumer.getPromiseWithPathId(id, authToken)
    }

    public getTask(taskId:string, authToken:string):Promise<Task>{
        return this._taskConsumer.getPromiseWithPathId(taskId, authToken)
    }


}


export class JaqpotClientFactory{
    
    private _client:IJaqpotClient

    constructor(basePath:string){
        const config: AxiosRequestConfig = {
            baseURL: basePath,
        };
        const axiosC: AxiosInstance = axios.create(config);
        const featConsumer:FeatureConsumer = new FeatureConsumer(axiosC, basePath);
        const datasConsumer:DatasetConsumer = new DatasetConsumer(axiosC, basePath)
        const taskConsumer:DatasetConsumer = new TaskConsumer(axiosC, basePath)
        this._client = new JaqpotClient(basePath, axiosC, featConsumer, datasConsumer, taskConsumer);
    }

    public getClient(){
        return this._client;
    }

}