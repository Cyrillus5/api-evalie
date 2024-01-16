// Get code_commune, code_departement, code_region using the zipCode
// API Gouv

import axios from 'axios';

const getCollectivity = async (req, res) => {
    try{
        const { zipCode } = req.query;
        const response = await axios.get('https://geo.api.gouv.fr/communes');
        const collectivity = response.data.find(col => col.codesPostaux.includes(zipCode));

        if (collectivity) {
            res.status(200).json(collectivity);
        } else {
            res.status(404).json({ message: 'Collectivity not found' });
        }
    } catch(error){
        res.status(error.response?.status || 500).json({
            message: error.message || 'An unknown error occurred to get informations about collectivity'
        });
    }
};

export default getCollectivity;