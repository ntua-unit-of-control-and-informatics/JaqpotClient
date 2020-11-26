import { assert, expect } from "chai";
import { couldStartTrivia } from "typescript";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Feature, Model, Models, Dataset} from '../src/models/jaqpot.models'

describe('client', function() {
    const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDU5ODA5NzUsImlhdCI6MTYwNTk3Mzc3NiwiYXV0aF90aW1lIjoxNjA1OTczNzc1LCJqdGkiOiI4Zjg2ZjY2ZC04NTgyLTQwOTYtYWNiNi0yMDhkMDFkNjY4OTIiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI0MjVkNzYwLTAxOGQtNDA4YS1hZTBiLWNkZTRjNTYzNTRiOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiI1YzE3ZGY5MTgxYWExYzFiYWMxYTc0ODRjOGFlMTRjYTc3VWdXWFRQZyIsInNlc3Npb25fc3RhdGUiOiJlM2UwM2M5ZS1lYjk4LTQ2YTMtYmZhOS03MTZhZDI2YTk5NDciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUGFudGVsaXMgS2FyYXR6YXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYW50ZWxpc3BhbmthIiwiZ2l2ZW5fbmFtZSI6IlBhbnRlbGlzIiwiZmFtaWx5X25hbWUiOiJLYXJhdHphcyIsImVtYWlsIjoicGFudGVsaXNwYW5rYUBnbWFpbC5jb20ifQ.DGNy3KV7KJ-CSQTc_IVkQpNFMYmqkQsVvQ3wBVpLHOtMnIOxG7ZFayl_7glys7a3WP4xgsuHKMHTA-HMSPXVSxPUHAebBBtzG8k2F6sOzYnCoXTgArUF0B62Vr5FFn-Lo_NN8j4hzhdKH1LtyGETfcUZvWn_DRSYLcCdtFyTFFaOeBB9CUX6OGRdOpH85PBNsnIan1UJT5AbCVUrPVYc6zFuYP5zIpKwRUktVmoxqZk094CRYPmELHfzTZ_Ypb0B4RNC5Fj0VtONsaGxG8JvydwKa8AWlwoh3XjsTSZ2hIlLc1Zcc1i584mqfOIBi0G92a5X-DS2VX1IWBaU14Qidw"

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
    })

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
                expect(resp.total).to.equal(13)
            }
        ).catch(err=>{
            console.log(err)
        })

        // accClient.getMyModelsById("BCrXvYs3BQV9IBe57cJk", token).then(
        //     (resp:Model) =>{
        //         console.log(resp)
        //         expect(resp._id).to.equal("BCrXvYs3BQV9IBe57cJk")
        //     }
        // )

        // feature.then()
    });

});

  