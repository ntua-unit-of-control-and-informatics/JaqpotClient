import { assert, expect } from "chai";
import { couldStartTrivia } from "typescript";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Feature, Model, Models, Dataset} from '../src/models/jaqpot.models'

describe('client', function() {
    const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDY3NjAzOTIsImlhdCI6MTYwNjc1MzE5MywiYXV0aF90aW1lIjoxNjA2NzUzMTkyLCJqdGkiOiI5MzM0OGNmOC1iMWU5LTQ4NTEtODc0OS02OTdmNjM2NzFkNjkiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI0MjVkNzYwLTAxOGQtNDA4YS1hZTBiLWNkZTRjNTYzNTRiOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiJmYmQxOGExZjdiYzBjYzY2ZDA1ZmEwYzg5NWI0YTBjNTBiNloycnBPNyIsInNlc3Npb25fc3RhdGUiOiI0YmFjZDQ0OS1kOGRlLTQ2OTItOTdjYy1iZjg4ZWYyZTJjMGEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUGFudGVsaXMgS2FyYXR6YXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYW50ZWxpc3BhbmthIiwiZ2l2ZW5fbmFtZSI6IlBhbnRlbGlzIiwiZmFtaWx5X25hbWUiOiJLYXJhdHphcyIsImVtYWlsIjoicGFudGVsaXNwYW5rYUBnbWFpbC5jb20ifQ.gjNwYXOKUuxAeOL6ILPK5NKD6sZHp7slGdeYfAYHXc6fs6jVTbrSS94z8RFInnkXplOOFXUULcbgDNKTiF74SkgD4o_oV0wEuIR-uLZDwcTA5Z7iz8DNM3UC0BzXbYf4VoIZ2WuHa-GOdMEmHSS8MIyDvYPxGeZMFxEmmyaNz1zx_K9WuE7orOyEyYtqKi-3R1-1XWjc0zrWQV3PKr1tY6fI00YOC1SsMq_yJbHjuWgRi6eo1DN92V9M9Y9UetBTNtQB2logzEeTJXoSjF0A4ttJi0ykRLZQ4p5H9JKFaBHgs7oZRrMWpS3dRULMWb3PFJrdJbIeF61d8Y643hkp7g"   
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