import { assert, expect } from "chai";
import { couldStartTrivia } from "typescript";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Feature, Model, Models, Dataset} from '../src/models/jaqpot.models'

describe('client', function() {
    const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDY5MjgyMDgsImlhdCI6MTYwNjkyMTAwOSwiYXV0aF90aW1lIjoxNjA2OTIxMDA4LCJqdGkiOiJmYWY3NWE1Ny1iMzc2LTQyMzUtYjljNi1lZTgwMWY4ZDY4YWEiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI0MjVkNzYwLTAxOGQtNDA4YS1hZTBiLWNkZTRjNTYzNTRiOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiI2MDkxM2RlOWVlMThmYTgyN2Q5Y2YyMGU1MWNhNzJhOWIyUjF1dUVyUCIsInNlc3Npb25fc3RhdGUiOiJmMzA4ZGFlMy1mODFhLTQzYTEtODJmZC0wNzllY2E0YmQzY2YiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUGFudGVsaXMgS2FyYXR6YXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYW50ZWxpc3BhbmthIiwiZ2l2ZW5fbmFtZSI6IlBhbnRlbGlzIiwiZmFtaWx5X25hbWUiOiJLYXJhdHphcyIsImVtYWlsIjoicGFudGVsaXNwYW5rYUBnbWFpbC5jb20ifQ.a8xy4fRR0vJdJb7pAGcaAymMcx0ZEeiZY5DhcFFQApnxB1Ch2FIUDpmxs-yqV_qWvppX19ZaW5fEfsyQ-ubC0OEqUfnwqUm0hj2N41GV1yjHpwtwrzbuwI_biZQoAVI0E2mRZ4gGIxiqTSQdEuN3_r3quFAOr7Ysy-1ZZ3JpsM4ok3VWa8GDQlO3BrUzbyan_uCyhQ8_PwdfYGmJ7dqYzwUk8WlxRkhDkCOUXaaO_fpxBid-ECRyeW32LAe54lkgTmle_4hEucgjHoo4NPuJeHIJo_MFaoLBJ3vG_ic_io1aFAtjKcNz3fmAb-YKQjGeXJOtcGRX2Nec4CeE1jqlRg"
          
    it('Testing get feature', function() {
        jaqpotClient.getFeature("0829974ce50646d1a262dab15ffb2950", token).then(
            (resp:Feature) =>{
                // console.log(resp)
                expect(resp._id).to.equal("0829974ce50646d1a262dab15ffb2950")
            }
        ).catch(err=>{console.log(err)})
    });

    it('Testing get dataset by id', function(){
        jaqpotClient.getDataset('pmVhd0QtwlLLmTNExyApAY', token).then(
            (resp:Dataset) =>{
                // console.log(resp)
                expect(resp._id).to.equal("pmVhd0QtwlLLmTNExyApAY")
            }
        ).catch(err=>{console.log(err)})
    });

    it('Testing get my models', function() {
        jaqpotClient.getMyModels(token, 0, 10).then(
            (resp:Models) =>{
                console.log(resp)
                resp.models.forEach((m:Model)=>{
                    jaqpotClient.getModelById(m._id, token).then(
                        (resp:Model) =>{
                        // console.log(resp)
                        })
                })
                expect(resp.total).to.equal(18)
            }
        ).catch(err=>{
            console.log(err)
        })
    });
})