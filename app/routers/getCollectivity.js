// Get code_commune, code_departement, code_region using the zipCode
// API Gouv

import axios from 'axios';
import Joi from 'joi';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// MongoDB schema
const Schema = mongoose.Schema;
const collectiviteSchema = new Schema({
    nom: String,
    code: String,
    codeDepartement: String,
    siren: String,
    codeEpci: String,
    codeRegion: String,
    codesPostaux: [String],
    population: Number,
}, { timestamps: true });

// MongoDB model
const Collectivite = mongoose.model('Collectivite', collectiviteSchema);

// Connexion to MongoDB
const mongodbUsername = process.env.MONGODB_USERNAME;
const mondodbPassword = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${mongodbUsername}:${mondodbPassword}@cluster0.rhgaooa.mongodb.net/`)
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err));

const getCollectivity = async (req, res) => {
    try{
        const schema = Joi.object({
            zipCode: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        };

        // Verify last update
        const lastUpdate = await Collectivite.findOne().sort({ createdAt: -1 });
        const sixMonthsAgo = new Date(Date.now() - 183 * 24 * 60 * 60 * 1000);

        if (!lastUpdate || lastUpdate.createdAt < sixMonthsAgo) {
            // Update necessary
            const response = await axios.get('https://geo.api.gouv.fr/communes');
            // Delete old data
            await Collectivite.deleteMany({});
            // Create new data
            await Collectivite.insertMany(response.data);

            console.log('Database updated.');
        }
        // Get all collectivities
        const collectivities = await Collectivite.find();

        const { zipCode } = value;
        const collectivity = collectivities.find(col => col.codesPostaux.includes(zipCode));
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