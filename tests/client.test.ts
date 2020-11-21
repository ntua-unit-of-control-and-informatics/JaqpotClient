import { assert, expect } from "chai";
import { couldStartTrivia } from "typescript";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Dataset, Feature} from '../src/models/jaqpot.models'

describe('client', function() {
    const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDU4OTgxMTEsImlhdCI6MTYwNTg5MDkxMSwiYXV0aF90aW1lIjoxNjA1ODkwOTExLCJqdGkiOiI1ZWU5NjM3Mi1kM2ZhLTRhMjYtYWFjNS0yNzlmM2FlNzk3NmMiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI0MjVkNzYwLTAxOGQtNDA4YS1hZTBiLWNkZTRjNTYzNTRiOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiJhMjAzYzI2MzRmM2ZhZjRkYzVkZGQyMzFjOGYyODJmNDA3WjF6R3hZVCIsInNlc3Npb25fc3RhdGUiOiI3ZjkwMWM2Yi1mZGRhLTRiZjMtYmM4Mi02YzIyOTcyYzQ2NjUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUGFudGVsaXMgS2FyYXR6YXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYW50ZWxpc3BhbmthIiwiZ2l2ZW5fbmFtZSI6IlBhbnRlbGlzIiwiZmFtaWx5X25hbWUiOiJLYXJhdHphcyIsImVtYWlsIjoicGFudGVsaXNwYW5rYUBnbWFpbC5jb20ifQ.kHR5MRn3itCRfboNhVPqbXzDdj8ZGp-5PwWit_XprfZC61lLidukG5D7DgAzO9qeVV3L1P4zO876C40T-uCbMPfAbX-TiChf7x30lhKBeTingdWvgv0jHjBTDsECOr4iiebJKqy2haAeb_I_Uy2IyAsCkdokJr_dKQ5odMvMmW7e2RdY0ZMQxKOoYQPf4_IkKBTXCKbJHybOS47GJBH2FR2XyrDVV69y1lo6Sn2mTbWW2D8O_ZTbuILMnK0VNn2u-viIjMoHR0SBL6KztzY8moMukaJ4cSkh5Uf3AvV2J0hb5y62mqCRR_2nQzMka6QxW9ehbJWgQatfX3-2lAPs9g"

    it('Testing get feature', function() {
        jaqpotClient.getFeature("0829974ce50646d1a262dab15ffb2950", token).then(
            (resp:Feature) =>{
                console.log(resp)
                expect(resp._id).to.equal("0829974ce50646d1a262dab1")
            }
        ).catch(err=>{console.log(err)})
    });

    it('Testing get dataset by id', function(){
        jaqpotClient.getDataset('pmVhd0QtwlLLmTNExyApAY', token).then(
            (resp:Dataset) =>{
                console.log(resp)
                expect(resp._id).to.equal("pmVhd0QtwlLLmTNExyApAY")
            }
        ).catch(err=>{console.log(err)})
    })

});