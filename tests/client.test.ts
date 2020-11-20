import { assert, expect } from "chai";
import { couldStartTrivia } from "typescript";
import { IJaqpotClient, JaqpotClientFactory} from '../src/client'
import {Feature} from '../src/models/jaqpot.models'

describe('client', function() {
    const accClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MDU4Nzc5NzEsImlhdCI6MTYwNTg3NDM3MSwianRpIjoiYTc3NmY3YWEtNWVlNS00NTkzLTlmMjUtYmU5YTFhN2Y2MTk4IiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMTAuMTAwOjMwMTAwL2F1dGgvcmVhbG1zL2phcXBvdCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyNDI1ZDc2MC0wMThkLTQwOGEtYWUwYi1jZGU0YzU2MzU0YjkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJqYXFwb3QtYXBpIiwic2Vzc2lvbl9zdGF0ZSI6ImRmNDUzZTBkLWRiZjctNDRmMS1iNGI4LWI4M2ZjNGUxNzZiMSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiXCIqXCIiLCIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIHdyaXRlIHJlYWQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJQYW50ZWxpcyBLYXJhdHphcyIsImdyb3VwcyI6WyIvQWRtaW5pc3RyYXRvciJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYW50ZWxpc3BhbmthIiwiZ2l2ZW5fbmFtZSI6IlBhbnRlbGlzIiwiZmFtaWx5X25hbWUiOiJLYXJhdHphcyIsImVtYWlsIjoicGFudGVsaXNwYW5rYUBnbWFpbC5jb20ifQ.Hl7rO6xD57xWC22BkZrvuZtof0fEk8Qwi356x76iQxKetg5FerIwCVWG3aeL9xFcx4S_bB4svWuDA2I94NLOMQnoXrlWBnsrBCb3i6AUcRcc70BNrjYOtLtpzehvgtxaXHhSyH3GR8b1xvo7K3EZtDMwWI3eUF3j1QD3UkcTgTO4KIe5kpfxrbROsp_gnVlRMzj6qTWVHCnyiPQwY7BR-5Vfb4jovuLonHBW2WAa6zS7-tk4Um5oGdQM9t9bNqZr5GtUQinZUVRP6QE3G-PPni9BX6ikn1MK0Pe4dxIdvGtDxvRTbmgR7QTE_2u4JOSJwERN65tZz40MkqVRf_MWAw"

    it('Testing get feature', function() {
        accClient.getFeature("0829974ce50646d1a262dab15ffb2950", token).then(
            (resp:Feature) =>{
                console.log(resp)
                expect(resp._id).to.equal("0829974ce50646d1a262dab1")
            }
        )
        // feature.then()
    });
  });