// Get Eligible dispositifs using localization
// API ADEME

import axios from 'axios';
import Joi from 'joi';

import getEligibleDispositifs from '../services/getEligibleDispositifs.js';
import getDispositifsDescription from '../services/getDispositifsDescription.js';

const getEligibility = async (req, res) => {
    try{
        const schema = Joi.object({
            codeCollectivity: Joi.string().required(),
            codeCollectivityDepartment: Joi.string().required(),
            codeCollectivityRegion: Joi.string().required(),
            selectedItem: Joi.string().required(),
            typeHouseLowerCase: Joi.string().required(),
        });
        
        // Validate datas
        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        };

        const { codeCollectivity, codeCollectivityDepartment, codeCollectivityRegion, selectedItem, typeHouseLowerCase } = value;
        
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