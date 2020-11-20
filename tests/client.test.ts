import { assert, expect } from "chai";
import { couldStartTrivia } from "typescript";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Feature, Model, Models} from '../src/models/jaqpot.models'

describe('client', function() {
    const accClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDU5MDY5NTcsImlhdCI6MTYwNTg5OTc1OCwiYXV0aF90aW1lIjoxNjA1ODk5NzU3LCJqdGkiOiIwOGYzYmFjMy01NTkxLTQ0YmItYjhmNC1mNzAzM2JkMWZkNGUiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijc2NWYzZDIwLTc4YWUtNDdkZC05OTJmLTU3OTdiZGYxNWU5MCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiI5M2ZiYWE2M2MwOGFkMTBlZTZmMGU4YTBjNTA2Njk1YTI5eFVMMWN1TiIsInNlc3Npb25fc3RhdGUiOiI0NzkyNWRkNC1lODEyLTQzY2EtOWNmNS0xMTliZGQ4ZWZlZmEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFzb24gU290aXJvcG91bG9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamFzb25zb3RpMUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFzb24iLCJmYW1pbHlfbmFtZSI6IlNvdGlyb3BvdWxvcyIsImVtYWlsIjoiamFzb25zb3RpMUBnbWFpbC5jb20ifQ.CxWEjZd5-LQoNh7KlGDY9iFjpg4p8U7AYKl-bQoldBhSQ4F5PKJfPinzRoTKErswNite1GExfKfCwfCmUlB0F0xWeFENnJujVXk9HKVChEV0OLaWD45TF2l-uz6UELEwwxUYDU6SYCOIJvvGt9YpYo4-ygRb857jzTDdpmZWdcMJ96xh9TO6XjpMIVFBob1Dy-EShuNZME8s9s3l8Dd1urIm6foY7GoGcGWQDN6XLSqeklfXzCKlh7K0NEVGhzBY9TiDNyQgV75T-ldnslcTtjlHMkMOuhm0Q1Td6V0l6-DKV80KJqNhPKyXugbv9v1-fOpznBnqlWOz76kJiSvgKg"

    it('Testing get feature', function() {
        accClient.getFeature("0829974ce50646d1a262dab15ffb2950", token).then(
            (resp:Feature) =>{
                console.log(resp)
                expect(resp._id).to.equal("0829974ce50646d1a262dab1")
            }
        )

        // accClient.getModelById("OX2cWB4lItav1ITof041", token).then(
        //     (resp:Model) =>{
        //         console.log(resp)
        //         expect(resp._id).to.equal("BCrXvYs3BQV9IBe57cJk")
        //     }
        
        // )

        // feature.then()
    });

    it('Testing get my models', function() {
        accClient.getMyModels(token, 0, 10).then(
            (resp:Models) =>{
                console.log(resp)
                resp.models.forEach((m:Model)=>{
                    accClient.getModelById(m._id, token).then(
                        (resp:Model) =>{
                        console.log(resp)
                        })
                })
                expect(resp.total).to.equal(9)
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

  