const taxonomy = require("../models/taxonomy");

exports.getTaxonomy = async(req, res) => {
    try {
        const taxonomys = await taxonomy.find();
        res.json(taxonomys);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getIdTaxonomy = async(req, res) => {
    try {
        const taxonomyFind = await taxonomy.find(req.params.id);
        res.json(taxonomyFind);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.taxonomyCreate = async(req, res) => {
    try {
        const newTaxonomy = await taxonomy.create(req.body);
        res.json(newTaxonomy);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.taxonomyUpdate = async(req, res) => {
    try {
        const newTaxonomy = await taxonomy.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(newTaxonomy)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.taxonomyDelete = async(req, res) => {
    try {
        const taxonomyDel = await taxonomy.findByIdAndDelete(req.params.id);
        res.json(taxonomyDel);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

