// Get Eligible dispositifs using localization
// API ADEME

import axios from 'axios';

import getEligibleDispositifs from '../services/getEligibleDispositifs.js';
import getDispositifsDescription from '../services/getDispositifsDescription.js';

const getEligibility = async (req, res) => {
    try{
        const { codeCollectivity, codeCollectivityDepartment, codeCollectivityRegion, selectedItem, typeHouseLowerCase } = req.query;

        // Get all works list
        const response = await axios.get(`https://data.ademe.fr/data-fair/api/v1/datasets/simul'aideuros-dispositifs-travaux/lines?size=6000&select=id_dispositif%2Cintitule%2C${typeHouseLowerCase}%2Coutre_mer`);
        
        const workSelected = response.data.results.filter(work => work.intitule === selectedItem);

        const listEligibleDispositifsWithWorkSelected = workSelected.map(dispositif => dispositif.id_dispositif );

        const selectedResults = await getEligibleDispositifs(listEligibleDispositifsWithWorkSelected, codeCollectivity, codeCollectivityDepartment, codeCollectivityRegion);

        const dispositifs = await getDispositifsDescription(selectedResults);
       
        if(dispositifs){
            res.status(200).json(dispositifs)
        } else {
            res.status(404).json({ message: 'No matching' });
        }
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message || 'An unknown error occurred to get eligible help systems'
        });
    }
};

export default getEligibility; 