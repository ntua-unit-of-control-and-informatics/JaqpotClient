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

    const token:string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ3Ujh3X1lGOWpKWFRWQ2x2VHF1RkswZkctQXROQUJsb3FBd0N4MmlTTWQ4In0.eyJleHAiOjE2MTg4NDk4MDAsImlhdCI6MTYxODg0MjYwMCwiYXV0aF90aW1lIjoxNjE4ODQwODE0LCJqdGkiOiI2Zjk0OTVlNC03YTYyLTRmODItODY1OC03YjQ5NWY1YzlhYTUiLCJpc3MiOiJodHRwczovL2xvZ2luLmphcXBvdC5vcmcvYXV0aC9yZWFsbXMvamFxcG90IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI0MjVkNzYwLTAxOGQtNDA4YS1hZTBiLWNkZTRjNTYzNTRiOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImphcXBvdC11aS1jb2RlIiwibm9uY2UiOiJjNWVmZDc0ODczNDIwODc2Yjk4ZjllNzYzNTliMzI1ODI0eHhlYlRxTSIsInNlc3Npb25fc3RhdGUiOiI1MTE0Y2I5NS0xNjAzLTQ5MGUtYWU3Yy1iODk3MDU0Zjc1NjgiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIicqJyIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBqYXFwb3QtYWNjb3VudHMgZW1haWwgcHJvZmlsZSB3cml0ZSByZWFkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUGFudGVsaXMgS2FyYXR6YXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYW50ZWxpc3BhbmthIiwiZ2l2ZW5fbmFtZSI6IlBhbnRlbGlzIiwiZmFtaWx5X25hbWUiOiJLYXJhdHphcyIsImVtYWlsIjoicGFudGVsaXNwYW5rYUBnbWFpbC5jb20ifQ.F3cpqJKO35al-8iahg8RQrJmqLws-lXfMyO-Il9oXdb51ZWkSP0yri7HMAgczHr5k2k7ATNQxfIcClsuUCZTUv6DSBDSt_gq24lMeJcKshsIyGlbcg9M1rY-JJVSc-SXN8Ue8l9lL-5JMI6HU21sU02IU0xDz7Uxjnc5WiQE8K3RpNcAPmp_bkpmD4VvSU_oQisyqlpZuF1wK_HqlnlypISatwws9lSF-kSyickBu1Q7Nlg0AcsVs6zw_udFKV6kvcpeu8-QSQ6x_4Ov0hjehKVkfCzkFHM5MvxMaEYCAxLrCNwzrV0q79la5Vjz66dJH7VudzterZDy1y-lFgdk0g";


    
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
        

        let valse = [
            {
                "AUCCC_fusion_heat": 12.68,
                "AUCCO_atomic_radius": 335,
                "AUCCO_evaporation_heat": 340,
                "AUCOO_boiling_point": 8360.38,
                "CCCC_atomic_number": 2.3993725958845276,
                "CCCC_atomic_radius": 27.99268028531949,
                "CCCC_atomic_volume": 2.119445793031333,
                "CCCC_atomic_weight": 4.803144041528177,
                "CCCC_boiling_point": 2039.4667065018484,
                "CCCC_density": 0.8997647234566979,
                "CCCC_dipole_polarizability": 4.518818388915861,
                "CCCC_en_pailing": 1.0197333532509243,
                "CCCC_lattice_constant": 1.4276266945512939,
                "CCCC_specific_heat": 0.2843256526123165,
                "CCCC_thermal_conductivity": 0.6358337379093999,
                "CCCN_atomic_number": 1.212794562497666,
                "CCCN_atomic_radius": 13.340740187474324,
                "CCCN_atomic_volume": 1.6105911789969003,
                "CCCN_atomic_weight": 2.4275295962953276,
                "CCCN_boiling_point": 745.9850842140643,
                "CCCN_density": 0.3666520521342943,
                "CCCN_dipole_polarizability": 2.003536617246144,
                "CCCN_en_pailing": 0.518590954924002,
                "CCCN_lattice_constant": 0.715500280091123,
                "CCCN_specific_heat": 0.10347563207230084,
                "CCCN_thermal_conductivity": 0.23266250886955223,
                "CCCO_atomic_number": 2.907445444473491,
                "CCCO_atomic_radius": 30.19270269260933,
                "CCCO_atomic_volume": 3.3435622611445144,
                "CCCO_boiling_point": 1721.0053001954416,
                "CCCO_density": 0.883304290996004,
                "CCCO_en_pailing": 1.2401373068927313,
                "CCCO_lattice_constant": 1.9614074267717319,
                "CCCO_thermal_conductivity": 0.5364236845053592,
                "CCNO_density": 0.5510847866950492,
                "CCNO_dipole_polarizability": 3.012744768520248,
                "CCNS_atomic_number": 0.03572717879772442,
                "CCNS_atomic_volume": 0.04430170170917828,
                "CCNS_boiling_point": 11.22366667911516,
                "CCNS_thermal_conductivity": 0.0035482192428825735,
                "CCOO_atomic_number": 3.017465237579515,
                "CCOO_atomic_radius": 28.019320063238354,
                "CCOO_atomic_weight": 6.037085807471587,
                "CCOO_boiling_point": 1118.658421530916,
                "CCOO_dipole_polarizability": 3.5778516388442823,
                "CCOO_lattice_constant": 2.241545605059068,
                "CCOO_thermal_conductivity": 0.348517234940434,
                "CCOS_atomic_weight": 0.25124397804085596,
                "CCOS_boiling_point": 38.36929603764425,
                "CCOS_dipole_polarizability": 0.16486785923242583,
                "CCOS_specific_heat": 0.007507935915151062,
                "CCSS_atomic_number": 1.9274750718900548,
                "CCSS_atomic_radius": 14.89412555551406,
                "CCSS_atomic_volume": 1.822340067968779,
                "CCSS_atomic_weight": 3.861170631512118,
                "CCSS_boiling_point": 509.7141242110766,
                "CCSS_density": 0.3784860141165926,
                "CCSS_dipole_polarizability": 2.689703850319303,
                "CCSS_en_pailing": 0.44945214176345366,
                "CCSS_evaporation_heat": 0.9199312843111626,
                "CCSS_fusion_heat": 0.1077633790193076,
                "CCSS_lattice_constant": 1.230079545878926,
                "CCSS_specific_heat": 0.12642484221533404,
                "CCSS_thermal_conductivity": 0.16295925607797734,
                "CNNN_atomic_number": 0.002016656085446465,
                "CNNN_atomic_radius": 0.019793106023826418,
                "CNNN_atomic_volume": 0.004272323262501401,
                "CNNN_atomic_weight": 0.004035702281809015,
                "CNNN_boiling_point": 0.3982671695858386,
                "CNNN_density": 0.00034910557568062144,
                "CNNN_dipole_polarizability": 0.0025021473652761697,
                "CNNN_en_pailing": 0.0008716435747096387,
                "CNNN_lattice_constant": 0.0011716771856443962,
                "CNNN_specific_heat": 0.000053105276916756914,
                "CNNN_thermal_conductivity": 0.00012458453150091496,
                "CNNO_atomic_number": 0.11502408783657615,
                "CNNO_atomic_radius": 1.06808081562535,
                "CNNO_en_pailing": 0.04958359786383837,
                "CNOO_atomic_radius": 2.948986070134817,
                "CNOO_boiling_point": 61.96085720332126,
                "CNOO_density": 0.06194027212408659,
                "CNOO_en_pailing": 0.1442112011552203,
                "CNOO_specific_heat": 0.008222467042611196,
                "COOO_atomic_number": 1.2693729693393583,
                "COOO_atomic_radius": 10.578108077827986,
                "COOO_atomic_volume": 2.001378048325055,
                "COOO_atomic_weight": 2.5390844381372073,
                "COOO_boiling_point": 227.24187959816254,
                "COOO_density": 0.24105392687754415,
                "COOO_dipole_polarizability": 1.150898158867685,
                "COOO_en_pailing": 0.5445610038465847,
                "COOO_lattice_constant": 1.0180371214101656,
                "COOO_specific_heat": 0.030084139373342794,
                "COOO_thermal_conductivity": 0.07070407439220225,
                "COOS_dipole_polarizability": 0.00205649126738121,
                "COSS_atomic_volume": 0.006261592660367728,
                "COSS_evaporation_heat": 0.0026141838144676404,
                "COSS_fusion_heat": 0.00030623296112335216,
                "COSS_lattice_constant": 0.0039013581307340887,
                "CSSS_atomic_weight": 1.0101112895395303,
                "CSSS_en_pailing": 0.09607125518168577,
                "OOOO_atomic_number": 0.13743137767487024,
                "OOOO_atomic_radius": 1.0307353325615267,
                "OOOO_atomic_volume": 0.2405049109310229,
                "OOOO_atomic_weight": 0.2748455764275311,
                "OOOO_boiling_point": 1.5493669940620682,
                "OOOO_density": 0.019738581618553238,
                "OOOO_dipole_polarizability": 0.09104828770960152,
                "OOOO_en_pailing": 0.059095492400194204,
                "OOOO_lattice_constant": 0.11733203868992047,
                "OOOO_thermal_conductivity": 0.000463830899652687,
                "SSSS_atomic_number": 0.0087637400256439,
                "SSSS_atomic_volume": 0.008489873149842527,
                "SSSS_atomic_weight": 0.017560344076383964,
                "SSSS_boiling_point": 0.3931764325104879,
                "SSSS_density": 0.0011338088658176793,
                "SSSS_dipole_polarizability": 0.010626034781093228,
                "SSSS_en_pailing": 0.0014131530791350788,
                "SSSS_evaporation_heat": 0.005751204391828809,
                "SSSS_fusion_heat": 0.0006737125144713747,
                "SSSS_lattice_constant": 0.005734772379280727,
                "SSSS_specific_heat": 0.0004009411061732084,
                "SSSS_thermal_conductivity": 0.0001478881129327408
            }
        ]

        
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