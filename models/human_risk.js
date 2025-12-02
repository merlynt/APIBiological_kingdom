import mongoose from "mongoose";

const humanRiskSchema = new mongoose.Schema({
    Specie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specie',
        required: true
    },

    risk_type: {
        type: String,
        required: true
    },

    lethality_rating: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    frequency_incident: {
        type: String,
        enum: ['rare', 'occasional', 'frequent'],
        required: true
    }
});

const HumanRisk = mongoose.model('HumanRisk', humanRiskSchema);

export default HumanRisk;