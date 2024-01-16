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

const getDispositifsDescription = async (dispositifsList) => {
    try {
        const selectId = dispositifsList.map(dispositif => dispositif.id);

        // Remove duplicate with Set
        const uniqueId = [...new Set(selectId)];

        // Get all existed dispositifs
        const baseUrl = "https://data.ademe.fr/data-fair/api/v1/datasets/simul'aideuros-dispositifs/lines";
        const queryParams = {
            size: 10000,
            select: 'id,code_type_dispositif,intitule,descriptif,debut_validite,fin_validite,financeur',
        };

        const allResults = await fetchAllData(baseUrl, queryParams);
        // Get only dispositifs using id selected
        const filteredResults = allResults
            .filter(dispositif => uniqueId.includes(dispositif.id));
        
        let uniqueResults = [];
        
        // Remove duplicate
        uniqueId.forEach(id => {
            const foundDispositif = filteredResults.find(dispositif => dispositif.id === id);
            if (foundDispositif) {
                uniqueResults.push(foundDispositif);
            }
        });
            
        return uniqueResults;
    } catch(error){
        console.error('Error fetching dispositifs description:', error);
        throw error;
    }
};

export default getDispositifsDescription;