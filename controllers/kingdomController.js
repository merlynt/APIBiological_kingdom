const kingdom = require("../models/Kingdom");


exports.getKingdoms = async(req, res) => {
    try {
        const kingdoms = await kingdom.find();
        res.json(kingdoms);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getKingdomById = async(req, res) => {
    try {
        const kingdomFind = await kingdom.findById(req.params.id);
        res.json(kingdomFind)
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
}

exports.kingdomCreate = async (req, res) => {
    try {
        const newKingdom = await kingdom.create(req.body);
        res.json(newKingdom);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.kingdomUpdate = async(req, res)=>{
    try {
        const newKingdom = await kingdom.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(newKingdom);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.kingdomDelete = async(req, res) => {
    try {
        const kingdomDel = await kingdom.findByIdAndDelete(req.params.id);
        res.json(kingdomDel);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}