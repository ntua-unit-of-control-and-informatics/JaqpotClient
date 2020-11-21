import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { Feature } from '../models/jaqpot.models';
import { BaseConsumer } from './base.consumer';

export interface IDatasetConsumer{
    getPromiseWithPathId(id:string, token:string):Promise< Feature >;
}

export class DatasetConsumer extends BaseConsumer<Feature> implements IDatasetConsumer{

    constructor(_httpClient:AxiosInstance, _jaqpotBase:string){
            super(_httpClient, "dataset/", _jaqpotBase)
    }

} 