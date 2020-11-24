import { expect } from "chai";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Feature, Model, Models, Dataset} from '../src/models/jaqpot.models'
import {DatasetAdapterFactory, IDatasetAdapterFactory } from '../src/adapter/dataset.adapter'
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { FeatureConsumer } from "../src/api/feature.consumer";
import { DatasetConsumer } from "../src/api/dataset.consumer";
import { TaskConsumer } from "../src/api/task.consumer";
import { ModelConsumer } from "../src/api/model.consumer";
import { DoaConsumer } from "../src/api/doa.consumer";

describe('predict', function() {

    const basePath:string = "https://api.jaqpot.org/jaqpot/services"
    const jaqpotClient:IJaqpotClient = new JaqpotClientFactory(basePath).getClient();

    const config: AxiosRequestConfig = {
        baseURL: basePath,
    };
    const axiosC: AxiosInstance = axios.create(config);
    const featConsumer:FeatureConsumer = new FeatureConsumer(axiosC, basePath);
    const datasConsumer:DatasetConsumer = new DatasetConsumer(axiosC, basePath)
    const taskConsumer:TaskConsumer = new TaskConsumer(axiosC, basePath)
    const modelConsumer:ModelConsumer = new ModelConsumer(axiosC, basePath);    
    const doaConsumer:DoaConsumer = new DoaConsumer(axiosC, basePath) 

    const datasetAdapter:IDatasetAdapterFactory = new DatasetAdapterFactory(modelConsumer, datasConsumer, featConsumer)

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDU5ODA5NzUsImlhdCI6MTYwNTk3Mzc3NiwiYXV0aF90aW1lIjoxNjA1OTczNzc1LCJqdGkiOiI4Zjg2ZjY2ZC04NTgyLTQwOTYtYWNiNi0yMDhkMDFkNjY4OTIiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI0MjVkNzYwLTAxOGQtNDA4YS1hZTBiLWNkZTRjNTYzNTRiOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiI1YzE3ZGY5MTgxYWExYzFiYWMxYTc0ODRjOGFlMTRjYTc3VWdXWFRQZyIsInNlc3Npb25fc3RhdGUiOiJlM2UwM2M5ZS1lYjk4LTQ2YTMtYmZhOS03MTZhZDI2YTk5NDciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUGFudGVsaXMgS2FyYXR6YXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYW50ZWxpc3BhbmthIiwiZ2l2ZW5fbmFtZSI6IlBhbnRlbGlzIiwiZmFtaWx5X25hbWUiOiJLYXJhdHphcyIsImVtYWlsIjoicGFudGVsaXNwYW5rYUBnbWFpbC5jb20ifQ.DGNy3KV7KJ-CSQTc_IVkQpNFMYmqkQsVvQ3wBVpLHOtMnIOxG7ZFayl_7glys7a3WP4xgsuHKMHTA-HMSPXVSxPUHAebBBtzG8k2F6sOzYnCoXTgArUF0B62Vr5FFn-Lo_NN8j4hzhdKH1LtyGETfcUZvWn_DRSYLcCdtFyTFFaOeBB9CUX6OGRdOpH85PBNsnIan1UJT5AbCVUrPVYc6zFuYP5zIpKwRUktVmoxqZk094CRYPmELHfzTZ_Ypb0B4RNC5Fj0VtONsaGxG8JvydwKa8AWlwoh3XjsTSZ2hIlLc1Zcc1i584mqfOIBi0G92a5X-DS2VX1IWBaU14Qidw"


    it('Testing adapter', function() {
        let vals = {}
        vals['EQP'] = 0.2
        vals['NEQ'] = 0.1
        vals['GAP'] = 0.3
        vals['LFG'] = 0.1
        let dat = datasetAdapter.createModelsDataset('gQjfUtEHHuwGnnxmlsyl', vals, token)
    });

});