import { expect } from "chai";
import { IJaqpotClient, JaqpotClientFactory} from "../src/client"
import {Feature, Model, Models, Dataset, Prediction} from "../src/models/jaqpot.models"
import {DatasetAdapterFactory, IDatasetAdapterFactory } from "../src/adapter/dataset.adapter"
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { FeatureConsumer } from "../src/api/feature.consumer";
import { DatasetConsumer } from "../src/api/dataset.consumer";
import { TaskConsumer } from "../src/api/task.consumer";
import { ModelConsumer } from "../src/api/model.consumer";
import { DoaConsumer } from "../src/api/doa.consumer";

describe("predict", function() {

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

    const datasetAdapter:IDatasetAdapterFactory = new DatasetAdapterFactory(modelConsumer)//, datasConsumer, featConsumer)

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDY3NjAzOTIsImlhdCI6MTYwNjc1MzE5MywiYXV0aF90aW1lIjoxNjA2NzUzMTkyLCJqdGkiOiI5MzM0OGNmOC1iMWU5LTQ4NTEtODc0OS02OTdmNjM2NzFkNjkiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI0MjVkNzYwLTAxOGQtNDA4YS1hZTBiLWNkZTRjNTYzNTRiOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiJmYmQxOGExZjdiYzBjYzY2ZDA1ZmEwYzg5NWI0YTBjNTBiNloycnBPNyIsInNlc3Npb25fc3RhdGUiOiI0YmFjZDQ0OS1kOGRlLTQ2OTItOTdjYy1iZjg4ZWYyZTJjMGEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUGFudGVsaXMgS2FyYXR6YXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYW50ZWxpc3BhbmthIiwiZ2l2ZW5fbmFtZSI6IlBhbnRlbGlzIiwiZmFtaWx5X25hbWUiOiJLYXJhdHphcyIsImVtYWlsIjoicGFudGVsaXNwYW5rYUBnbWFpbC5jb20ifQ.gjNwYXOKUuxAeOL6ILPK5NKD6sZHp7slGdeYfAYHXc6fs6jVTbrSS94z8RFInnkXplOOFXUULcbgDNKTiF74SkgD4o_oV0wEuIR-uLZDwcTA5Z7iz8DNM3UC0BzXbYf4VoIZ2WuHa-GOdMEmHSS8MIyDvYPxGeZMFxEmmyaNz1zx_K9WuE7orOyEyYtqKi-3R1-1XWjc0zrWQV3PKr1tY6fI00YOC1SsMq_yJbHjuWgRi6eo1DN92V9M9Y9UetBTNtQB2logzEeTJXoSjF0A4ttJi0ykRLZQ4p5H9JKFaBHgs7oZRrMWpS3dRULMWb3PFJrdJbIeF61d8Y643hkp7g"
    // it("Testing adapter", function() {
    //     let vals = {}
    //     let arr_vals = []
    //     vals["Magnetic core"] = 0.2
    //     vals["Relaxivity"] = 0.1
    //     vals["Max size"] = 0.3
    //     vals["Min size"] = 0.1
    //     vals["Overall size (nm)"] = 0.1
    //     vals["Fe/cell (pg)"] = 0.1
    //     vals["B0 (T)"] = 0.1
    //     arr_vals.push(vals)
        
    //     vals = {}
    //     vals["Magnetic core"] = 0.4
    //     vals["Relaxivity"] = 0.5
    //     vals["Max size"] = 0.78
    //     vals["Min size"] = 0.01
    //     vals["Overall size (nm)"] = 45
    //     vals["Fe/cell (pg)"] = 35
    //     vals["B0 (T)"] = 0
    //     arr_vals.push(vals)
    //     let dat = datasetAdapter.createModelsDataset("3whTzLV3TyVFLzBJjTs7", arr_vals, token)

    //     dat.then(d=>{
    //         console.log(d)

    //     })


    // });


    // it('Testing post models', function() {

    //     let vals = {}
    //     let arr_vals = []
    //     vals["Magnetic core"] = 0.2
    //     vals["Relaxivity"] = 0.1
    //     vals["Max size"] = 0.3
    //     vals["Min size"] = 0.1
    //     vals["Overall size (nm)"] = 0.1
    //     vals["Fe/cell (pg)"] = 0.1
    //     vals["B0 (T)"] = 0.1
    //     arr_vals.push(vals)
        
    //     vals = {}
    //     vals["Magnetic core"] = 0.4
    //     vals["Relaxivity"] = 0.5
    //     vals["Max size"] = 0.78
    //     vals["Min size"] = 0.01
    //     vals["Overall size (nm)"] = 45
    //     vals["Fe/cell (pg)"] = 35
    //     vals["B0 (T)"] = 0
    //     arr_vals.push(vals)

    //     let dat = datasetAdapter.createModelsDataset("3whTzLV3TyVFLzBJjTs7", arr_vals, token)

    //     dat.then((d:Dataset)=>{
    //             console.log(d)
    //             let r =datasConsumer.postDataset(d,token)
    //             console.log('IASON', r)
    //             r.then(resp=>{
    //                 console.log(resp)
    //             }).catch(err=>{
    //                 console.log(err)
    //             })

    //         }
    //         )

    //     })

    it('Testing post models', function() {

        const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

        let modelId = "3whTzLV3TyVFLzBJjTs7"


        let vals = {}
        let arr_vals = []
        vals["Magnetic core"] = 0.2
        vals["Relaxivity"] = 0.1
        vals["Max size"] = 0.3
        vals["Min size"] = 0.1
        vals["Overall size (nm)"] = 0.1
        vals["Fe/cell (pg)"] = 0.1
        vals["B0 (T)"] = 0.1
        arr_vals.push(vals)
        
        vals = {}
        vals["Magnetic core"] = 0.4
        vals["Relaxivity"] = 0.5
        vals["Max size"] = 0.78
        vals["Min size"] = 0.01
        vals["Overall size (nm)"] = 45
        vals["Fe/cell (pg)"] = 35
        vals["B0 (T)"] = 0
        arr_vals.push(vals)
        
        
        // let dat = datasetAdapter.createModelsDataset("3whTzLV3TyVFLzBJjTs7", arr_vals, token)
        
        
        jaqpotClient.predict(modelId, arr_vals, token).then(
            (resp:Prediction) =>{
                console.log(resp)
                }).catch(err => {
                    console.log(err)
                })

        })

});