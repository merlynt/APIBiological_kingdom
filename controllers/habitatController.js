const Habitat = require('../models/habitat');

exports.getHabitats = async (req, res) => {
    try {
        const newHabit = await Habitat.find();
        res.json(newHabit);
    } catch (error) {  
        res.status(500).json({error: error.message});
    }
}

exports.getHabitatById = async(req, res) => {
    try {
        const findHabit = await Habitat.findById(req.params.id);
        res.json(findHabit);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.createHabitat = async(req, res) =>{
    try {
        const newHabit = await Habitat.create(req.body);
        res.json(newHabit);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.updateHabitat = async(req, res) => {
    try {
        const newHabit = await Habitat.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(newHabit);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.deleteHabitat = async(req, res) => {
    try {
        const habitDel = await Habitat.findByIdAndDelete(req.params.id);
        res.json(habitDel);
    } catch (error) {
        
    }
}