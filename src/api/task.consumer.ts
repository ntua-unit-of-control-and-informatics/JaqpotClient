import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { Task } from '../models/jaqpot.models';
import { BaseConsumer } from './base.consumer';

export interface ITaskConsumer{
    getPromiseWithPathId(id:string, token:string):Promise< Task >;
}

export class TaskConsumer extends BaseConsumer<Task> implements ITaskConsumer{

    constructor(_httpClient:AxiosInstance, _jaqpotBase:string){
            super(_httpClient, "task/", _jaqpotBase)
    }

} 