import { FeatureConsumer } from "./api/feature.consumer";
import { DatasetConsumer } from "./api/dataset.consumer";
import { TaskConsumer } from "./api/task.consumer";
import { Dataset, Feature, Model, Task, Models, Doa } from "./models/jaqpot.models";
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { ModelConsumer } from "./api/model.consumer";
import { DoaConsumer } from "./api/doa.consumer";
import {DatasetAdapterFactory, IDatasetAdapterFactory } from "../src/adapter/dataset.adapter"


export interface IJaqpotClient{
    // predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>
    getModelById(modelId:string, authToken:string):Promise<Model>
    getMyModels(authToken:string, min:Number, max:Number):Promise<Models>
    getOrgsModels(organization:string, min:Number, max:Number, authToken:string):Promise<Models>
    getFeature(featId:string, authToken:string):Promise<Feature>
    getDataset(id:string, authToken:string):Promise<Dataset>
    // predict(modelId:string, datasetId:string, authToken:string):Promise<Dataset>
    predict(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Dataset>
    getModelsDoa(modelId:string, authToken:string):Promise<Doa>
}

export class JaqpotClient implements IJaqpotClient{

    private _basePath:string;
    private _client: AxiosInstance;
    private _featureConsumer:FeatureConsumer;
    private _datasetConsumer:DatasetConsumer;
    private _taskConsumer:TaskConsumer;
    private _modelConsumer:ModelConsumer;
    private _doaConsumer:DoaConsumer;
    private _datasetAdapter:IDatasetAdapterFactory;

    constructor(
        _jaqpotBase:string
        , axiosInstance:AxiosInstance
        , _featConsuner:FeatureConsumer
        , _datasetConsumer:DatasetConsumer
        , _taskConsumer:TaskConsumer
        , _doaConsumer:DoaConsumer
        , _modelConsumer:ModelConsumer
        , _datasetAdapter:IDatasetAdapterFactory
    ){
        this._basePath = _jaqpotBase
        this._client = axiosInstance
        this._featureConsumer = _featConsuner
        this._datasetConsumer = _datasetConsumer
        this._taskConsumer = _taskConsumer
        this._modelConsumer = _modelConsumer
        this._doaConsumer = _doaConsumer
        this._datasetAdapter = _datasetAdapter
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

    public predict(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Dataset>{
        
        let ret = this._datasetAdapter.createModelsDataset(modelId, values, authToken).then(
            (data:Dataset) => {
                this._datasetConsumer.postDataset(data, authToken).then(
                    (dataset:Dataset)=>{
                        console.log(dataset)
                        this._modelConsumer.predict(modelId, dataset._id, authToken).then(
                            (pred:Task)=>{
                                let loop:boolean = true
                                let percent:number = 0
                                let data_id:string = ''
                                console.log(pred)
                                while(loop){
                                    setTimeout(() => {
                                        this._taskConsumer.getPromiseWithPathId(pred._id, authToken).then(
                                            (tsk:Task) =>{
                                                console.log(tsk)
                                                percent = tsk.percentageCompleted
                                                data_id = tsk.result
                                        })
                                        if (percent = 100){
                                            loop = false
                                        }
                                    }, 800)
                                
                                }
                                
                                return this._datasetConsumer.getPromiseWithPathId(data_id.split('/')[1],authToken).then(resp =>{console.log(resp)})
                                
                        })
                })
            })
        
        var promise = new Promise(function(resolve) {
            resolve(ret);
        });
        
        return promise;
        
    }

    // public predict(modelId:string, datasetId:string, authToken:string):Promise<Dataset>{
    //     return this._modelConsumer.predict(modelId, datasetId, authToken)
    // }
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
        const datasetAdapter:IDatasetAdapterFactory = new DatasetAdapterFactory(modelConsumer)  
        this._client = new JaqpotClient(basePath, axiosC, featConsumer, datasConsumer, taskConsumer, doaConsumer, modelConsumer,datasetAdapter);
    
    }

    public getClient(){
        return this._client;
    }

}