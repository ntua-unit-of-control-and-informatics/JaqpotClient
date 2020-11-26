import { DatasetConsumer } from '../api/dataset.consumer'
import { FeatureConsumer } from '../api/feature.consumer'
import { ModelConsumer } from '../api/model.consumer'
import { Dataset, FeatureInfo, Feature, Model } from '../models/jaqpot.models'


export interface IDatasetAdapterFactory{
    getDataset():Dataset
    createModelsDataset(modelId:string, _values: { [key: string]: any; }, authToken:string):Dataset
}

export class DatasetAdapterFactory implements IDatasetAdapterFactory{

    private _model:Model
    private _values?: { [key: string]: any; }
    private _modelConsumer:ModelConsumer
    private _datasetConsumer:DatasetConsumer
    private _featureConsumer:FeatureConsumer

    constructor( modelConsumer:ModelConsumer
        , datasetConsumer:DatasetConsumer
        , featureConsumer:FeatureConsumer){
            this._modelConsumer = modelConsumer
            this._featureConsumer = featureConsumer
            this._datasetConsumer = datasetConsumer
    }

    public getDataset():Dataset{
        let dataset:Dataset = {}
        return dataset
    }

    public createModelsDataset(modelId:string, values: { [key: string]: any; }, authToken:string):Dataset{
        let dataset:Dataset = {}
        this._modelConsumer.getPromiseWithPathId(modelId, authToken).then((m:Model) =>{
            m.independentFeatures.forEach(indf=>{
                let featu:string[] = indf.split("/")
                let featId = featu[featu.length - 1]
                this._featureConsumer.getPromiseWithPathId(featId, authToken).then((f:Feature) =>{
                    console.log(f)
                })
                
            })
        })
        return dataset
    }

}

// export function DatasetAdapter(values?: { [key: string]: any; }):Dataset{
//     let dataset:Dataset = {}



//     return dataset
// }