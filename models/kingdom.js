import mongoose from "mongoose";

const KingdomSchema = new mongoose.Schema({
    scientific_name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taxonomic_authority:{
        type: String,
        required: true
    },
    publication_year:{
        type: Number,
        required: true
    }
}, {timestamps: true});

const Kingdom = mongoose.model("Kingdom", KingdomSchema);

export default Kingdom;
