// Get eligible financial assistance according to zip code
import axios from 'axios';

const fetchAllData = async (baseUrl, queryParams) => {
    let allResults = [];
    let after = queryParams.after || '';
    let hasMore = true;

    while (hasMore) {
        const response = await axios.get(baseUrl, {
            params: { ...queryParams, after: after }
        });
        allResults = allResults.concat(response.data.results);
        after = response.data.next ? new URL(response.data.next).searchParams.get('after') : '';
        hasMore = !!response.data.next;
    }

    return allResults;
};

const getEligibleDispositifs = async (listEligibleDispositifsWithWorkSelected, codeCollectivity, codeCollectivityDepartment, codeCollectivityRegion) => {
    try {
        const baseUrl = "https://data.ademe.fr/data-fair/api/v1/datasets/simul'aideuros-dispositifs-perimetres-geographiques/lines";
        const queryParams = {
            size: 10000,
            select: 'id,code_type_dispositif,intitule,code_region,code_departement,code_commune,code_epci,_id',
        };

        const allResults = await fetchAllData(baseUrl, queryParams);

        const filteredResults = allResults
            .filter(dispositif => listEligibleDispositifsWithWorkSelected.includes(dispositif.id))            
            .filter(dispositif => dispositif.code_commune === codeCollectivity || dispositif.code_departement == codeCollectivityDepartment || dispositif.code_region == codeCollectivityRegion);
        
        return filteredResults;

    } catch (error) {
        console.error('Error fetching eligible dispositifs:', error);
        throw error;
    }
};

export default getEligibleDispositifs;