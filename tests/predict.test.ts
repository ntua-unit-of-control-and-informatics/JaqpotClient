import { expect } from "chai";
import { IJaqpotClient, JaqpotClientFactory} from "../src/client"
import {Feature, Model, Models, Dataset} from "../src/models/jaqpot.models"
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

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDY0MTY5NDMsImlhdCI6MTYwNjQwOTc0NCwiYXV0aF90aW1lIjoxNjA2NDA5NzQzLCJqdGkiOiI5NWEyMjEzNi03MDYyLTQzNTItODg4Yy1lOTFjYjc4OTEzNWUiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijc2NWYzZDIwLTc4YWUtNDdkZC05OTJmLTU3OTdiZGYxNWU5MCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiJhZjI0ZGZkYTM2YmE4NDBjZTA2NDZkMmM2NjVhZjIwZTg4WjRaZVdjUiIsInNlc3Npb25fc3RhdGUiOiJiNjE5YTAwYS1lYjgyLTRkOWEtOTZiZS1mZGEzMTQ0OGNjYTQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFzb24gU290aXJvcG91bG9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamFzb25zb3RpMUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFzb24iLCJmYW1pbHlfbmFtZSI6IlNvdGlyb3BvdWxvcyIsImVtYWlsIjoiamFzb25zb3RpMUBnbWFpbC5jb20ifQ.HhePRXxcjWO1lkZil84E_2PcGd2vpC8IkmQfk0Y2Q3Y7IqgPOVqN0jnT07dvoQ8Y0jzTXFq46y0zTpCv5u1DttJpSrLxf6WXspBFhAOZ3mwrnTvYc3G1xVKqDur6wa_MirxLAB73YOCoieyVbHZd5VvWa2xJcdH9QhiseTk4iZK__LwLzu-TaJPyroS7F2dT2SApKQYj1OJfvMCE1tgxr6W1Wyy8gmA3uL2CZAcLpaSX-UqmuBl9xdQsTa8IXGSgDcKKsaT00JwHKKaww5WqmjCKM_i4205LaPgYVSga33P5ZrRnCP5mMUj6-yEi83oUnw7GcQlP4tG6MjkQSZsUXA"


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
            (resp:Dataset) =>{
                console.log(resp)
                }).catch(err => {
                    console.log(err)
                })

        })

});