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

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDY1MDYxODMsImlhdCI6MTYwNjQ5ODk4NCwiYXV0aF90aW1lIjoxNjA2NDk4OTgzLCJqdGkiOiI0NzI1NTBjMi1kYTI3LTQwMWUtOWYyOS05ZDliOGVjOTBkZmEiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijc2NWYzZDIwLTc4YWUtNDdkZC05OTJmLTU3OTdiZGYxNWU5MCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiJhYjhmMmZmNjllZjM4MTBmNTc1NGNmOWIzNDg3YWRhOWVkV3RmRW14cSIsInNlc3Npb25fc3RhdGUiOiIyMGIxNWI2Ni1kZjAwLTQxZWEtOWI1Ni1mZjgyYWJmZjNlZjkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFzb24gU290aXJvcG91bG9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamFzb25zb3RpMUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFzb24iLCJmYW1pbHlfbmFtZSI6IlNvdGlyb3BvdWxvcyIsImVtYWlsIjoiamFzb25zb3RpMUBnbWFpbC5jb20ifQ.MmOGOeNwmsKWnTp8oqvfyOvkGo7lrcBGwRE36g32wioIqUIQjgXDBUY2sem9JuuOKTaBJlN5E9JsJ7nTb5155rL8y6OrJJC7fkqSa_XeSOZe3_pd1EjAEpxJoAUgj_jCKiZCTIoRgYkLB1z9e8oJajm5TOgpkV0yahZjG4mZg7kIXGdJ-Tw4eR-N5fhQp2CIDcjs4BjWaCU5qLi9d07cSwXhV8-iYWha8CRIyArvfpGz_DRuxhVwzgSAL93vgMhaB-9hZn-tXT2YkbhXrM5AwPFJaX_oPglDpnpDmQY55jAznyRttvP7ugk-m8kB21glKfmw7TUHt2BLSEIk_zmRkg"


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