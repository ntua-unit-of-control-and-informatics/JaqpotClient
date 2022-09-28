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
import { ChempotConsumer } from "../src/api/chempot.consumer";
import { Chempot } from '../src/models/jaqpot.models';

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

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2NjQ1MzM4NzgsImlhdCI6MTY2NDM2MTA3OCwianRpIjoiMGFjZWE0N2QtOTU4MC00ODFkLTlhNWEtZTM3YjRjZGFlNThmIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMTAuMTAwOjMwMTAwL2F1dGgvcmVhbG1zL2phcXBvdCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3NjVmM2QyMC03OGFlLTQ3ZGQtOTkyZi01Nzk3YmRmMTVlOTAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJqYXFwb3QtYXBpIiwic2Vzc2lvbl9zdGF0ZSI6ImUzNDdhZmVjLWY2MDAtNDgzMC04NmVkLWEzY2ZlYjQzOTMxYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiXCIqXCIiLCIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIHdyaXRlIHJlYWQiLCJzaWQiOiJlMzQ3YWZlYy1mNjAwLTQ4MzAtODZlZC1hM2NmZWI0MzkzMWIiLCJ1cG4iOiJqYXNvbnNvdGkxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYWRkcmVzcyI6e30sIm5hbWUiOiJKYXNvbiBTb3Rpcm9wb3Vsb3MiLCJncm91cHMiOltdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJqYXNvbnNvdGkxQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJKYXNvbiIsImZhbWlseV9uYW1lIjoiU290aXJvcG91bG9zIiwiZW1haWwiOiJqYXNvbnNvdGkxQGdtYWlsLmNvbSJ9.bE78lH2X-MeVdF_-5HobPlHIMavgybE2hyfHhW3ciqrLUsV_30EmTwQCUhlD2RS8uuIJA_ihfGzB_IqqbuEQUK3fvDPly8lcpBt1nxVdq_BM_unKwRJpPAY39L5JSdwJNBUCblKhPf7z2oAIedrbwBBdePDankhl0cAae8D83jgQqfmIKnDeT7BpZ9Yuqy2sIGFzCWXwfXvjTif22Fr_sbB3AVxyvITL7K5YhwX6avT44cUtMBtB4n-PC7JL_5u5KaxusrjQSLR5IUJwOTH6saxpUtWwUKE2szn9Ua1v0JH-_bgpRrRY9qCxcxAqI1Eon5sMxEWsZZh0Q2IRIQUDLQ";


    
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


    it('Testing prediction with doa', function() {
        const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

        let modelId = "BDlyeaMrTUowMs5P4Cr4";
        let vals = [{'Nanoparticle': 29.0,
        'Type:_Organic_(O)/inorganic_(I)': 0,
        'Diameter_(nm)': 20.0,
        'Concentration_μM': 0.005,
        'Exposure_time_(h)': 24.0,
        'Cells_A431': 0,
        'Cells_A549': 0,
        'Cells_AGS': 0,
        'Cells_B_cells': 0,
        'Cells_C18–4': 0,
        'Cells_CD3+_T_cells': 0,
        'Cells_CD4+T_cells': 0,
        'Cells_CDBgeo': 0,
        'Cells_CHO': 0,
        'Cells_COS': 0,
        'Cells_Caco2': 0,
        'Cells_Calu3': 0,
        'Cells_Clone9': 0,
        'Cells_ECV304': 0,
        'Cells_EJ28': 0,
        'Cells_Fibroblasts': 0,
        'Cells_H4': 0,
        'Cells_HAEC': 0,
        'Cells_HCMEC': 0,
        'Cells_HDF': 0,
        'Cells_HEK293': 0,
        'Cells_HMEC1': 0,
        'Cells_HMM': 0,
        'Cells_HUVEC': 0,
        'Cells_HaCaT': 0,
        'Cells_HeLa': 1,
        'Cells_HepG2': 0,
        'Cells_IMR90': 0,
        'Cells_IP15': 0,
        'Cells_J774': 0,
        'Cells_KEC': 0,
        'Cells_L929': 0,
        'Cells_LLCPK1': 0,
        'Cells_LoVo': 0,
        'Cells_Lymphocytes': 0,
        'Cells_L02': 0,
        'Cells_MCF7': 0,
        'Cells_MDAMB231': 0,
        'Cells_MDCK': 0,
        'Cells_MG63': 0,
        'Cells_Monocytes': 0,
        'Cells_NCIH441': 0,
        'Cells_NK_cells': 0,
        'Cells_NR8383': 0,
        'Cells_Naive_Tcell': 0,
        'Cells_Neuro2a': 0,
        'Cells_PAECs': 0,
        'Cells_PC12': 0,
        'Cells_PC3': 0,
        'Cells_PMA_activated_THP1': 0,
        'Cells_RAW_264.7': 0,
        'Cells_SHSY5Y': 0,
        'Cells_SKOV3': 0,
        'Cells_SKBR3': 0,
        'Cells_SKMel28': 0,
        'Cells_SVEC410': 0,
        'Cells_T98G': 0,
        'Cells_THP1': 0,
        'Cells_UMUC3': 0,
        'Cells_V14': 0,
        'Cells_VERO': 0,
        'Cells_hTERTBJ1': 0,
        'Cells_primary_alveolar_Macrophage': 0,
        'Cells_primary_alveolar_epithelial_cells': 0,
        'Cells_primary_tissue_Macrophage': 0,
        'Biochemical_metric_ATP_content': 0,
        'Biochemical_metric_LDH_leakage': 0,
        'Biochemical_metric_cell_membrane_integrity': 1,
        'Biochemical_metric_cell_metabolic_activity': 0,
        'Biochemical_metric_lysosomal_uptake': 0,
        'Biochemical_metric_protease_activity': 0},
       {'Nanoparticle': 19.0,
        'Type:_Organic_(O)/inorganic_(I)': 0,
        'Diameter_(nm)': 420.7,
        'Concentration_μM': 4.0276611233793717e-07,
        'Exposure_time_(h)': 24.0,
        'Cells_A431': 0,
        'Cells_A549': 0,
        'Cells_AGS': 1,
        'Cells_B_cells': 0,
        'Cells_C18–4': 0,
        'Cells_CD3+_T_cells': 0,
        'Cells_CD4+T_cells': 0,
        'Cells_CDBgeo': 0,
        'Cells_CHO': 0,
        'Cells_COS': 0,
        'Cells_Caco2': 0,
        'Cells_Calu3': 0,
        'Cells_Clone9': 0,
        'Cells_ECV304': 0,
        'Cells_EJ28': 0,
        'Cells_Fibroblasts': 0,
        'Cells_H4': 0,
        'Cells_HAEC': 0,
        'Cells_HCMEC': 0,
        'Cells_HDF': 0,
        'Cells_HEK293': 0,
        'Cells_HMEC1': 0,
        'Cells_HMM': 0,
        'Cells_HUVEC': 0,
        'Cells_HaCaT': 0,
        'Cells_HeLa': 0,
        'Cells_HepG2': 0,
        'Cells_IMR90': 0,
        'Cells_IP15': 0,
        'Cells_J774': 0,
        'Cells_KEC': 0,
        'Cells_L929': 0,
        'Cells_LLCPK1': 0,
        'Cells_LoVo': 0,
        'Cells_Lymphocytes': 0,
        'Cells_L02': 0,
        'Cells_MCF7': 0,
        'Cells_MDAMB231': 0,
        'Cells_MDCK': 0,
        'Cells_MG63': 0,
        'Cells_Monocytes': 0,
        'Cells_NCIH441': 0,
        'Cells_NK_cells': 0,
        'Cells_NR8383': 0,
        'Cells_Naive_Tcell': 0,
        'Cells_Neuro2a': 0,
        'Cells_PAECs': 0,
        'Cells_PC12': 0,
        'Cells_PC3': 0,
        'Cells_PMA_activated_THP1': 0,
        'Cells_RAW_264.7': 0,
        'Cells_SHSY5Y': 0,
        'Cells_SKOV3': 0,
        'Cells_SKBR3': 0,
        'Cells_SKMel28': 0,
        'Cells_SVEC410': 0,
        'Cells_T98G': 0,
        'Cells_THP1': 0,
        'Cells_UMUC3': 0,
        'Cells_V14': 0,
        'Cells_VERO': 0,
        'Cells_hTERTBJ1': 0,
        'Cells_primary_alveolar_Macrophage': 0,
        'Cells_primary_alveolar_epithelial_cells': 0,
        'Cells_primary_tissue_Macrophage': 0,
        'Biochemical_metric_ATP_content': 0,
        'Biochemical_metric_LDH_leakage': 0,
        'Biochemical_metric_cell_membrane_integrity': 0,
        'Biochemical_metric_cell_metabolic_activity': 1,
        'Biochemical_metric_lysosomal_uptake': 0,
        'Biochemical_metric_protease_activity': 0}]

        jaqpotClient.predict_with_doa("BDlyeaMrTUowMs5P4Cr4", vals, token).then(
            (resp:Prediction) =>{
                console.log(resp.aValue)
                // expect(resp._id).to.equal("0829974ce50646d1a262dab15ffb2950")
            }
        ).catch(err=>{console.log(err)})
      
    });


    it('Testing post models', function() {

        const jaqpotClient:IJaqpotClient = new JaqpotClientFactory("https://api.jaqpot.org/jaqpot/services").getClient();

        let modelId = "3whTzLV3TyVFLzBJjTs7"


        let vals:{ [key: string]: any; } = {}
        let arr_vals = []
        vals["Magnetic core"] = 0.2
        vals["Relaxivity"] = 0.1
        vals["Max size"] = 0.3
        vals["Min size"] = 0.1
        vals["Overall size (nm)"] = 0.1
        vals["Fe/cell (pg)"] = 0.1
        vals["B0 (T)"] = 0.1
        arr_vals.push(vals)
        
        let vals2:{ [key: string]: any; } = {}
        vals2["Magnetic core"] = 0.4
        vals2["Relaxivity"] = 0.5
        vals2["Max size"] = 0.78
        vals2["Min size"] = 0.01
        vals2["Overall size (nm)"] = 45
        vals2["Fe/cell (pg)"] = 35
        vals2["B0 (T)"] = 0
        arr_vals.push(vals2)
        

        
        // let dat = datasetAdapter.createModelsDataset("3whTzLV3TyVFLzBJjTs7", arr_vals, token)
        
        
        jaqpotClient.predict(modelId, arr_vals, token).then(
            (resp:Prediction) =>{
                console.log(resp)
                }).catch(err => {
                    console.log(err)
                })

        })

        var chempot:Chempot = {}
        chempot.descriptors = "mordred";
        chempot.modelId = "modelsid";
        chempot.smiles = "CCSDDDF";
        chempot.withDoa = false;
        jaqpotClient.chempot(chempot, token).then((res:Prediction)=>{
            // res.d
            res.data;
            res.predictions;
        })

});