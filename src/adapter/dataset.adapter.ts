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
            let dataset:Dataset = {}

            let dict = m.additionalInfo.independentFeatures
            let info:FeatureInfo = {}
            dataset.features = []
            dataset.dataEntry = []
            let cnt:number = 0
            let reverse = {}
            
            for (let key in dict){
                info.uri = key
                info.key = cnt.toString()
                info.name = dict[key]
                reverse[dict[key]] = cnt.toString()
                dataset.features.push(info)
                info = {}
                cnt = cnt + 1
            };
            
            cnt = 0

            for (let index in values){
                let data : DataEntry = {}
                let entry : EntryId = {}
                let vals = {}
                let row = values[index]
                entry.name = cnt.toString()
                
                for (let key in row){                    
                    vals[reverse[key]] = row[key]
                };

                data.values = vals
                data.entryId = entry

                dataset.dataEntry.push(data)
                data = {}
                entry = {}
                cnt = cnt + 1
            };

            var promise = new Promise(function(resolve) {
                resolve(dataset);
              });
            
              return promise;
        })

    }

}