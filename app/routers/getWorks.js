// Get works list
// API ADEME

import axios from 'axios';

const getWorks = async (req, res) => {
    try {
        const response = await axios.get("https://data.ademe.fr/data-fair/api/v1/datasets/simul'aideuros-dispositifs-travaux/values/intitule?size=100");
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message || 'An unknown error occurred to get works list'
        });
    }
};

export default getWorks;
