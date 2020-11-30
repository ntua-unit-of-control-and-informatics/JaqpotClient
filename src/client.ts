import { FeatureConsumer } from "./api/feature.consumer";
import { DatasetConsumer } from "./api/dataset.consumer";
import { TaskConsumer } from "./api/task.consumer";
import { Dataset, Feature, Model, Task, Models, Doa, Prediction } from "./models/jaqpot.models";
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
    predict(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<void | Prediction>
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

    public predict(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Prediction>{

        return this._datasetAdapter.createModelsDataset(modelId, values, authToken).then(
            (dataset:Dataset) =>{
                this._datasetConsumer.postDataset(dataset, authToken).then(
                    (dataset:any)=>{
                        this._modelConsumer.predict(modelId, dataset.data._id, authToken).then((pred:any)=>{
                                   
                            this.getTask(pred.data._id, authToken).then(
                                (tsk:Task) =>{
                                    function managePrediction(){
                                        setTimeout(function(task:Task){

                                            let percent = task.percentageCompleted
                                            let data_id = task.result
                                            if (percent === 100){
                                                this._datasetConsumer.getDatasetWithParam(data_id.split('/')[1], true,authToken).then(
                                                    (resp:Dataset)=>{
                                                        let prediction: Prediction= {}

                                                        prediction.modelId = modelId
                                                        prediction.datasetId = data_id
                                                        
                                                        for(var f in resp.features){
                                                            console.log(f)
                                                        }

                                                        var promise = new Promise(function(resolve, reject) {
                                                            resolve(prediction);
                                                            }); 
                                                        return promise
                                                    })
                                            }else{
                                                managePrediction()
                                            }
                                        }, 800)
                                    }
                                }
                            )
                        })
                })
            }
        )
    }

    
    // private managePrediction(){

    // }

        // return this._datasetAdapter.createModelsDataset(modelId, values, authToken).then(
        //     (data:Dataset) => {
        //         this._datasetConsumer.postDataset(data, authToken).then(
        //             (dataset:any)=>{

        //                 this._modelConsumer.predict(modelId, dataset.data._id, authToken).then(
                            
        //                     let retJson: Models= {}
        //                     retJson.total = Number(response.headers["total"]);
        //                     retJson.models = response.data
                
        //                     var promise = new Promise(function(resolve, reject) {
        //                         resolve(retJson);
        //                     });
                            
        //                     return promise)}
        //         )}

            //                 async (pred:any)=>{
            //                     let loop:boolean = true
            //                     let percent:number = 0
            //                     let data_id:string = ''
            //                     console.log(pred.data)

            //                     while(loop){
            //                         await new Promise(r => setTimeout(r, 800)).then(
            //                             () =>{
            //                                 this.getTask(pred.data._id, authToken).then(
            //                                     (tsk:Task) =>{                                                  
            //                                         percent = tsk.percentageCompleted
            //                                         data_id = tsk.result
            //                                         if (percent == 100){
            //                                             loop = false
            //                                             this._datasetConsumer.getDatasetWithParam(data_id.split('/')[1], true,authToken).then(
            //                                                 (resp:Dataset)=>{
            //                                                     let reverse = {}
            //                                                     let predictions = []
            //                                                     let prediction = {}

            //                                                     for (let index in resp.features){
            //                                                         reverse[resp.features[index].key] = resp.features[index].name
            //                                                     }
            //                                                     for (let index in resp.dataEntry){
            //                                                         for(let i in Object.keys(resp.dataEntry[index]['values'])){
            //                                                             prediction[reverse[i]] = resp.dataEntry[index]['values'][i]
            //                                                         }
            //                                                         predictions.push({
            //                                                             'entryId' : resp.dataEntry[index]['entryId']['name'], 
            //                                                             'values' : prediction 
            //                                                          })
            //                                                          prediction = {}    
            //                                                     }

            //                                                     let del = {
            //                                                         'modelId':modelId,
            //                                                         'dataId':dataset.data._id,
            //                                                         'data':predictions
            //                                                     } 
            //                                                     // console.log(del)
            //                                                     // console.log(del.data[0].values)
            //                                                     var promise = new Promise(function(resolve, reject) {
            //                                                         resolve(del);
            //                                                       });
                                                                
            //                                                     return promise;

            //                                             })
            //                                         }                                                    
            //                                 })
            //                             }
            //                         )
            //                         loop = false;
                                    
            //                     }     
            //             })
            //         })
            // })
            // .then( r =>{
            //     var promise = new Promise(function(resolve) {
            //         resolve(r);
            //     });
            //     console.log(r)
            //     return promise
            // })
        
    

    // public predict(modelId:string, datasetId:string, authToken:string):Promise<Dataset>{
    //     return this._modelConsumer.predict(modelId, datasetId, authToken)
    // }
    // getDataset(id:string, authToken:string):Promise<Dataset>

// }
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