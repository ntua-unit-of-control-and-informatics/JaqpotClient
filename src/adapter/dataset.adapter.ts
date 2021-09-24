import { ModelConsumer } from '../api/model.consumer'
import { Dataset, EntryId, DataEntry, FeatureInfo, Feature, Model } from '../models/jaqpot.models'


export interface IDatasetAdapterFactory{
    createModelsDataset(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Dataset>
}

export class DatasetAdapterFactory implements IDatasetAdapterFactory{

    private _modelConsumer:ModelConsumer

    constructor(modelConsumer:ModelConsumer){
            this._modelConsumer = modelConsumer
    }

    public createModelsDataset(modelId:string, values: Array<{ [key: string]: any; }>, authToken:string):Promise<Dataset>{
        
        return this._modelConsumer.getPromiseWithPathId(modelId, authToken).then((m:Model) =>{
            let dataset:Dataset = {meta:{}, features:[], dataEntry:[]}

            let dict:{ [key: string]: any; } = m.additionalInfo.independentFeatures
            let info:Partial<FeatureInfo> = {}
            dataset.features = []
            dataset.dataEntry = []
            let cnt:number = 0
            let reverse:{ [key: string]: any; } = {}
            
            for (let key in dict){
                info.uri = key
                info.key = cnt.toString()
                info.name = dict[key]
                reverse[dict[key]] = cnt.toString()
                let appendF:FeatureInfo = {key:info.key, name:dict[key], uri:info.uri}
                dataset.features.push(appendF)
                info = {}
                cnt = cnt + 1
            };
            
            cnt = 0

            for (let index in values){
                let data : Partial<DataEntry> = {}
                let entry : EntryId = {}
                let vals:{ [key: string]: any; }  = {}
                let row = values[index]
                entry.name = cnt.toString()
                
                for (let key in row){                    
                    vals[reverse[key]] = row[key]
                };

                data.values = vals
                data.entryId = entry
                let append:DataEntry = {entryId: data.entryId, values:data.values}
                dataset.dataEntry.push(append)
                // let data:Partial<DataEntry> = {}
                entry = {}
                cnt = cnt + 1
            };

            var promise:Promise<Dataset> = new Promise(function(resolve) {
                resolve(dataset);
              });
            
              return promise;
        })

    }

}