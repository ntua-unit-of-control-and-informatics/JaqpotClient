import { FeatureConsumer } from "./api/feature.consumer";
import { DatasetConsumer } from "./api/dataset.consumer";
import { TaskConsumer } from "./api/task.consumer";
import { Dataset, Feature, Model, Task, Models, Doa, Prediction, FeatureInfo, Pred, Chempot } from "./models/jaqpot.models";
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { ModelConsumer } from "./api/model.consumer";
import { DoaConsumer } from "./api/doa.consumer";
import {DatasetAdapterFactory, IDatasetAdapterFactory } from "./adapter/dataset.adapter"
import delay from "delay";
import { ChempotConsumer } from "./api/chempot.consumer";


export interface IJaqpotClient{
    // predict(values:{ [key: string]: any; }, authToken:string):Promise<Dataset>
    getModelById(modelId:string, authToken:string):Promise<Model>
    getMyModels(authToken:string, min:Number, max:Number):Promise<Models>
    getOrgsModels(organization:string, min:Number, max:Number, authToken:string):Promise<Models>
    getFeature(featId:string, authToken:string):Promise<Feature>
    getDataset(id:string, authToken:string):Promise<Dataset>
    predict_with_doa(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Prediction>
    predict(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Prediction>
    getOrgsTagModels(organization:string,tag:string, min:Number, max:Number, authToken:string):Promise<Models>
    getModelsDoa(modelId:string, authToken:string):Promise<Doa>
    chempot(chempot:Chempot, authToken:string):Promise<Prediction>
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
    private _chempotConsumer:ChempotConsumer;

    constructor(
        _jaqpotBase:string
        , axiosInstance:AxiosInstance
        , _featConsuner:FeatureConsumer
        , _datasetConsumer:DatasetConsumer
        , _taskConsumer:TaskConsumer
        , _doaConsumer:DoaConsumer
        , _modelConsumer:ModelConsumer
        , _datasetAdapter:IDatasetAdapterFactory
        , _chempotConsumer:ChempotConsumer
    ){
        this._basePath = _jaqpotBase
        this._client = axiosInstance
        this._featureConsumer = _featConsuner
        this._datasetConsumer = _datasetConsumer
        this._taskConsumer = _taskConsumer
        this._modelConsumer = _modelConsumer
        this._doaConsumer = _doaConsumer
        this._datasetAdapter = _datasetAdapter
        this._chempotConsumer = _chempotConsumer
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

    public getModelById(modelId:string, authToken:string):Promise<Model>{
        return this._modelConsumer.getPromiseWithPathId(modelId, authToken)
    }

    public getMyModels(authToken:string, min:Number, max:Number):Promise<Models>{
        return this._modelConsumer.getMyModels(authToken, min, max)
    }

    public getOrgsModels(organization:string, min:Number, max:Number, authToken:string):Promise<Models>{
        return this._modelConsumer.getOrgsModels(organization, min, max, authToken)
    }

    public getOrgsTagModels(organization:string,tag:string, min:Number, max:Number, authToken:string):Promise<Models>{
        return this._modelConsumer.getOrgsAndTagModels(organization, tag, min, max, authToken)
    }

    public getModelsDoa(modelId:string, authToken:string):Promise<Doa>{
        return this._doaConsumer.getModelsDoa(modelId, authToken)
    }

    public predict(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Prediction>{

        return this._datasetAdapter.createModelsDataset(modelId, values, authToken).then(
            (dataset:Dataset) =>{
                return this._datasetConsumer.postDataset(dataset, authToken).then(
                    (dataset:any)=>{
                        return this._modelConsumer.predict(modelId, dataset.data._id, authToken).then((pred:any)=>{  
                            return this.getTask(pred.data._id, authToken).then(
                                (tsk:Task) =>{
                                    return this.managePredictionP(tsk, modelId, authToken)
                                }
                            )
                        })
                })
            }
        )
    }

    public predict_with_doa(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Prediction>{
        return this._doaConsumer.getModelsDoa(modelId, authToken).then(
            (doa:Doa) =>{
                let aValue= doa.aValue
                return this._datasetAdapter.createModelsDataset(modelId, values, authToken).then(
                    (dataset:Dataset) =>{
                        return this._datasetConsumer.postDataset(dataset, authToken).then(
                            (dataset:any)=>{
                                return this._modelConsumer.predict(modelId, dataset.data._id, authToken, true).then((pred:any)=>{  
                                    return this.getTask(pred.data._id, authToken).then(
                                        
                                        (tsk:Task) =>{                
                                            return this.managePredictionP(tsk, modelId, authToken, aValue)
                                    })
                                })
                        })
                })
            }
        ).catch(err =>{
            return err
        })
        
    }

    public chempot(chempot:Chempot, authToken:string):Promise<Prediction>{
        return this._chempotConsumer.chempot(chempot, authToken).then((pred:any)=>{  
            return this.getTask(pred.data._id, authToken).then(
                (tsk:Task) =>{
                    return this.managePredictionP(tsk, chempot.modelId, authToken)
                }
            )
        })
    }

    private managePredictionP(tsk:Task, modelId:string, authToken:string, aValue?:number):Promise<Prediction>{
                return delay(400).then(()=>{
                    return this.getTask(tsk._id, authToken).then(
                        (tsk:Task) =>{
                            let percent = tsk.percentageCompleted
                            let data_id = tsk.result
                            if (percent === 100){
                                return this._datasetConsumer.getDatasetWithParam(data_id.split('/')[1], true,authToken).then(
                                    (resp:Dataset)=>{
                                        let prediction: Prediction= {}
                                        prediction.modelId = modelId
                                        prediction.datasetId = data_id
                                        
                                        let pred:{ [key: string]: any; } = {}
                                        let noPred:{ [key: string]: any; } = {}
                                        resp.features.forEach(f=>{
                                            if(f.category && f.category.valueOf().toString() === 'PREDICTED'){
                                                pred[f.key] = f.name
                                            }else{
                                                noPred[f.key] = f.name
                                            }
                                        } )
                                        let preds:Array<{ [key: string]: any; }> = []
                                        let inputs:Array<{ [key: string]: any; }> = []
                                        resp.dataEntry.forEach(de =>{
                                            let predict:{ [key: string]: any; } = {}
                                            let input:{ [key: string]: any; } = {}
                                            Object.keys(de.values).forEach(key =>{
                                                if(pred[key]){
                                                    predict[String(pred[key])] = de.values[key]
                                                }else if(noPred[key]){
                                                    input[String(noPred[key])] = de.values[key]
                                                } 
                                            })
                                            preds.push(predict)
                                            inputs.push(input)
                                        })
                                        prediction.data = inputs
                                        prediction.predictions = preds
                                        if (aValue !== undefined) {
                                            prediction.aValue = aValue
                                        }
    
                                        var promise:Promise<Prediction> = new Promise(function(resolve, reject) {
                                            resolve(prediction);
                                        }); 
                                        return promise
                                    })
                            }else{
                                return this.managePredictionP(tsk, modelId, authToken, aValue)
                            } 
                        })
                }
            )
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
        const taskConsumer:TaskConsumer = new TaskConsumer(axiosC, basePath)
        const modelConsumer:ModelConsumer = new ModelConsumer(axiosC, basePath);
        const doaConsumer:DoaConsumer = new DoaConsumer(axiosC, basePath)  
        const chempotConsumer:ChempotConsumer = new ChempotConsumer(axiosC, basePath);
        const datasetAdapter:IDatasetAdapterFactory = new DatasetAdapterFactory(modelConsumer)
        this._client = new JaqpotClient(basePath, axiosC, featConsumer, datasConsumer, taskConsumer, doaConsumer, modelConsumer,datasetAdapter, chempotConsumer);
    }

    public getClient(){
        return this._client;
    }

}

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