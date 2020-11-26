import { assert, expect } from "chai";
import { couldStartTrivia } from "typescript";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Feature, Model, Models, Dataset} from '../src/models/jaqpot.models'

describe('client', function() {
    const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();


    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDYzMTY5NTcsImlhdCI6MTYwNjMwOTc1NywiYXV0aF90aW1lIjoxNjA2MzA5NzU3LCJqdGkiOiI5MTM3Yjc2Yy1hNzYxLTQ1NjktYTViNi01MjYyZDZhMmFhOGYiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijc2NWYzZDIwLTc4YWUtNDdkZC05OTJmLTU3OTdiZGYxNWU5MCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiJkNmM5Njc2YzBjNGM2OTBkYjEyOWVkNzQwMjdkOTljNzA4UTZaVHl5aiIsInNlc3Npb25fc3RhdGUiOiIxM2MzNDQ1Ni1mMjg5LTQ0OTAtYmIzNy0wZDdmZGQwN2IyMTciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFzb24gU290aXJvcG91bG9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamFzb25zb3RpMUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFzb24iLCJmYW1pbHlfbmFtZSI6IlNvdGlyb3BvdWxvcyIsImVtYWlsIjoiamFzb25zb3RpMUBnbWFpbC5jb20ifQ.g2VL9Nvv_1tf4J8s7J5kngiW1UkVb2jYVu8Sjaqwr8SI3rVOooKKAQmg4P79u1NN99nezRFlNHrQP5kq91pr91ageUrHoReT1XeTquzyycvHkoHXql3j2nO0VnDFtrqKLP_01c0ffvggex80d5oiOe1MDg9N3Ljf8HPh4IXaIB0YgB-ulmf_R9qBLDhVayAe9opL9sWd6tM51wiz-9oMBwrGYbcxJ9r81C2cL8kF9Z9v3UUOXk1vEdpq4gmFw27cF012Q7bHBJpQwxWFRxGCaExxQHjA1D4JJNDs5SMA_li2woDJBWaNtsqxOgkuHPeaEcnXTOm8DGg4o8mx68Wj3g"

    // it('Testing get feature', function() {
    //     jaqpotClient.getFeature("0829974ce50646d1a262dab15ffb2950", token).then(
    //         (resp:Feature) =>{
    //             // console.log(resp)
    //             expect(resp._id).to.equal("0829974ce50646d1a262dab15ffb2950")
    //         }
    //     ).catch(err=>{console.log(err)})
    // });

    // it('Testing get dataset by id', function(){
    //     jaqpotClient.getDataset('pmVhd0QtwlLLmTNExyApAY', token).then(
    //         (resp:Dataset) =>{
    //             // console.log(resp)
    //             expect(resp._id).to.equal("pmVhd0QtwlLLmTNExyApAY")
    //         }
    //     ).catch(err=>{console.log(err)})
    // })

    // it('Testing get my models', function() {
    //     jaqpotClient.getMyModels(token, 0, 10).then(
    //         (resp:Models) =>{
    //             console.log(resp)
    //             resp.models.forEach((m:Model)=>{
    //                 jaqpotClient.getModelById(m._id, token).then(
    //                     (resp:Model) =>{
    //                     // console.log(resp)
    //                     })
    //             })
    //             expect(resp.total).to.equal(13)
    //         }
    //     ).catch(err=>{console.log(err)})
    // });

    // it('Testing get orgs models', function() {
    //     jaqpotClient.getOrgsModels("okjPc3ps", 0, 10, token).then(
    //         (resp:Models) =>{
    //             console.log(resp)
    //             resp.models.forEach((m:Model)=>{
    //                 jaqpotClient.getModelById(m._id, token).then(
    //                     (resp:Model) =>{
    //                     // console.log(resp)
    //                     })
    //             })
    //             // expect(resp.total).to.equal(13)
    //         }
    //     ).catch(err=>{console.log(err)})
    // });

        // accClient.getMyModelsById("BCrXvYs3BQV9IBe57cJk", token).then(
        //     (resp:Model) =>{
        //         console.log(resp)
        //         expect(resp._id).to.equal("BCrXvYs3BQV9IBe57cJk")
        //     }
        // )

        // feature.then()
});