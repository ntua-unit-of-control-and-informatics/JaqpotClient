import { assert, expect } from "chai";
import { couldStartTrivia } from "typescript";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Feature, Model, Models, Dataset, Doa} from '../src/models/jaqpot.models'

describe('client', function() {
    const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2NjQ1MzM4NzgsImlhdCI6MTY2NDM2MTA3OCwianRpIjoiMGFjZWE0N2QtOTU4MC00ODFkLTlhNWEtZTM3YjRjZGFlNThmIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMTAuMTAwOjMwMTAwL2F1dGgvcmVhbG1zL2phcXBvdCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3NjVmM2QyMC03OGFlLTQ3ZGQtOTkyZi01Nzk3YmRmMTVlOTAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJqYXFwb3QtYXBpIiwic2Vzc2lvbl9zdGF0ZSI6ImUzNDdhZmVjLWY2MDAtNDgzMC04NmVkLWEzY2ZlYjQzOTMxYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiXCIqXCIiLCIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIHdyaXRlIHJlYWQiLCJzaWQiOiJlMzQ3YWZlYy1mNjAwLTQ4MzAtODZlZC1hM2NmZWI0MzkzMWIiLCJ1cG4iOiJqYXNvbnNvdGkxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYWRkcmVzcyI6e30sIm5hbWUiOiJKYXNvbiBTb3Rpcm9wb3Vsb3MiLCJncm91cHMiOltdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJqYXNvbnNvdGkxQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJKYXNvbiIsImZhbWlseV9uYW1lIjoiU290aXJvcG91bG9zIiwiZW1haWwiOiJqYXNvbnNvdGkxQGdtYWlsLmNvbSJ9.bE78lH2X-MeVdF_-5HobPlHIMavgybE2hyfHhW3ciqrLUsV_30EmTwQCUhlD2RS8uuIJA_ihfGzB_IqqbuEQUK3fvDPly8lcpBt1nxVdq_BM_unKwRJpPAY39L5JSdwJNBUCblKhPf7z2oAIedrbwBBdePDankhl0cAae8D83jgQqfmIKnDeT7BpZ9Yuqy2sIGFzCWXwfXvjTif22Fr_sbB3AVxyvITL7K5YhwX6avT44cUtMBtB4n-PC7JL_5u5KaxusrjQSLR5IUJwOTH6saxpUtWwUKE2szn9Ua1v0JH-_bgpRrRY9qCxcxAqI1Eon5sMxEWsZZh0Q2IRIQUDLQ"
          
    it('Testing get feature', function() {
        jaqpotClient.getFeature("0829974ce50646d1a262dab15ffb2950", token).then(
            (resp:Feature) =>{
                // console.log(resp)
                expect(resp._id).to.equal("0829974ce50646d1a262dab15ffb2950")
            }
        ).catch(err=>{console.log(err)})
    });

    it('Testing get doa', function() {
        jaqpotClient.getModelsDoa('BDlyeaMrTUowMs5P4Cr4',token).then(
            (resp:Doa) =>{
                // console.log(resp)
                expect(resp._id).to.equal("4kuMVgIdlwi7fA0KSEYg")
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
                expect(resp.total).to.equal(38)
            }
        ).catch(err=>{
            console.log(err)
        })
    });
})