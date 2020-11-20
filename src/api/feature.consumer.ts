import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { Feature } from '../models/jaqpot.models';
import { BaseConsumer } from './base.consumer';

export interface IFeatureConsumer{
    getPromiseWithPathId(id:string, token:string):Promise< Feature >;
}

export class FeatureConsumer extends BaseConsumer<Feature> implements IFeatureConsumer{

    constructor(_httpClient:AxiosInstance, _jaqpotBase:string){
            super(_httpClient, "feature/", _jaqpotBase)
    }

} 