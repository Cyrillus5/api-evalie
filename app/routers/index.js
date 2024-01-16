import express from 'express';
import getWorks from './getWorks.js';
import getEligibility from './getEligibility.js';
import getCollectivity from './getCollectivity.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'API of evalie 1.0.0' });
});

router.get('/works-list', getWorks)

router.get('/eligible-systems', getEligibility)

router.get('/collectivities-list', getCollectivity)

export default router;