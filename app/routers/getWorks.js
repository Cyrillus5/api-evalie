// Get works list
// API ADEME

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert url on path
const __filename = fileURLToPath(import.meta.url);

// Get repository of current file
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'data', 'worksData.json');

const getWorks = async (req, res) => {
    try {
        if (fs.existsSync(dataPath)) {
            const stats = fs.statSync(dataPath);
            const sixMonthsAgo = new Date(Date.now() - 183 * 24 * 60 * 60 * 1000);
            const lastModified = new Date(stats.mtime);

            // If file has been updated since less 6 months we use data
            if (lastModified > sixMonthsAgo) {
                const data = fs.readFileSync(dataPath, 'utf8');
                return res.status(200).json(JSON.parse(data));
            }
        }

        // If file doesn't exist or too old -> new request
        const response = await axios.get("https://data.ademe.fr/data-fair/api/v1/datasets/simul'aideuros-dispositifs-travaux/values/intitule?size=100");
        // Save data into file
        fs.writeFileSync(dataPath, JSON.stringify(response.data), 'utf8');

        // Use file with new data
        const updatedData = fs.readFileSync(dataPath, 'utf8');
        res.status(200).json(JSON.parse(updatedData));
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message || 'An unknown error occurred to get works list'
        });
    }
};

export default getWorks;
