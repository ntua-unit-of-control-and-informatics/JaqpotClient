import { FeatureConsumer } from "./api/feature.consumer";
import { DatasetConsumer } from "./api/dataset.consumer";
import { TaskConsumer } from "./api/task.consumer";
import { Dataset, Feature, Model, Task, Models, Doa } from "./models/jaqpot.models";
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { ModelConsumer } from "./api/model.consumer";
import { DoaConsumer } from "./api/doa.consumer";


export interface IJaqpotClient{
    // predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>
    getModelById(modelId:string, authToken:string):Promise<Model>
    getMyModels(authToken:string, min:Number, max:Number):Promise<Models>
    getOrgsModels(organization:string, min:Number, max:Number, authToken:string):Promise<Models>
    getFeature(featId:string, authToken:string):Promise<Feature>
    getDataset(id:string, authToken:string):Promise<Dataset>
    predict(modelId:string, datasetId:string, authToken:string):Promise<Dataset>

    getModelsDoa(modelId:string, authToken:string):Promise<Doa>
}

export class JaqpotClient implements IJaqpotClient{

    private _basePath:string;
    private _client: AxiosInstance;
    private _featureConsumer:FeatureConsumer
    private _datasetConsumer:DatasetConsumer
    private _taskConsumer:TaskConsumer
    private _modelConsumer:ModelConsumer
    private _doaConsumer:DoaConsumer

    constructor(
        _jaqpotBase:string
        , axiosInstance:AxiosInstance
        , _featConsuner:FeatureConsumer
        , _datasetConsumer:DatasetConsumer
        , _taskConsumer:TaskConsumer
        , _doaConsumer:DoaConsumer
        , _modelConsumer:ModelConsumer
    ){
        this._basePath = _jaqpotBase
        this._client = axiosInstance
        this._featureConsumer = _featConsuner
        this._datasetConsumer = _datasetConsumer
        this._taskConsumer = _taskConsumer
        this._modelConsumer = _modelConsumer
        this._doaConsumer = _doaConsumer
    }

    // public predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>{

    // }

    public getFeature(featId:string, authToken:string):Promise<Feature>{
        return this._featureConsumer.getPromiseWithPathId(featId, authToken)
    }

    public getDataset(id:string, authToken:string):Promise<Dataset>{
        return this._datasetConsumer.getPromiseWithPathId(id, authToken)
    }

    public getTask(taskId:string, authToken:string):Promise<Task>{
        return this._taskConsumer.getPromiseWithPathId(taskId, authToken)
    }

    public getModelById(modelId:string, authToken:string):Promise<Feature>{
        return this._modelConsumer.getPromiseWithPathId(modelId, authToken)
    }

    public getMyModels(authToken:string, min:Number, max:Number):Promise<Models>{

        return this._modelConsumer.getMyModels(authToken, min, max)
    }

    public getOrgsModels(organization:string, min:Number, max:Number, authToken:string):Promise<Models>{

        return this._modelConsumer.getOrgsModels(organization, min, max, authToken)
    }

    public getModelsDoa(modelId:string, authToken:string):Promise<Doa>{
        return this._doaConsumer.getModelsDoa(modelId, authToken)
    }

    public predict(modelId:string, datasetId:string, authToken:string):Promise<Dataset>{
        return this._modelConsumer.predict(modelId, datasetId, authToken)
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
        const datasConsumer:DatasetConsumer = new DatasetConsumer(axiosC, basePath)
        const taskConsumer:TaskConsumer = new TaskConsumer(axiosC, basePath)
        const modelConsumer:ModelConsumer = new ModelConsumer(axiosC, basePath);
        const doaConsumer:DoaConsumer = new DoaConsumer(axiosC, basePath)  
        this._client = new JaqpotClient(basePath, axiosC, featConsumer, datasConsumer, taskConsumer, doaConsumer, modelConsumer);
    
    }

    public getClient(){
        return this._client;
    }

}