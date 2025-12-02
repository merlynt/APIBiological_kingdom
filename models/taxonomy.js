import mongoose from "mongoose";
const TaxonomySchema = new mongoose.Schema({
    phylum: {
        type: String,
        require: true
    },
    class: {
        type: String,
        require: true
    },
    order:{
        type: String,
        require: true
    },
    family:{
        type: String,
        require: true
    },
    genus:{
        type: String,
        require: true
    }
    
});

const Taxonomy = mongoose.model("Taxonomy", TaxonomySchema);
export default Taxonomy;