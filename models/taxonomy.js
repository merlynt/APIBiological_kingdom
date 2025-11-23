const mongoose = require('mongoose');

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

module.exports = mongoose.model("Taxonomy", TaxonomySchema);