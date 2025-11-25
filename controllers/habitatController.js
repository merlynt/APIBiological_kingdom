const Habitat = require('../models/habitat');

exports.getHabitats = async (req, res) => {
    try {
        const newHabit = await Habitat.find();
        res.status(200).json(newHabit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getHabitatById = async (req, res) => {
    try {
        const findHabit = await Habitat.findById(req.params.id);
        if (!findHabit) {
            return res.status(404).json({ message: 'Habitad no encontrada' });
        }
        res.status(200).json(findHabit);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createHabitat = async (req, res) => {
    try {
        const newHabit = await Habitat.create(req.body);
        res.status(201).json(newHabit);
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }

        return res.status(500).json({ message: 'Error del servidor al crear', error });
    }
}

exports.updateHabitat = async (req, res) => {
    try {
        const newHabit = await Habitat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!newHabit) {
            return res.status(404).json({ message: 'Habitad no encontrada' });
        }
        res.status(200).json(newHabit);
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }

        return res.status(500).json({ message: 'Error del servidor al crear', error });
    }
}

exports.deleteHabitat = async (req, res) => {
    try {
        const habitDel = await Habitat.findByIdAndDelete(req.params.id);
        if (!habitDel) {
            return res.status(404).json({ message: 'Habitad no encontrada' });
        }
        res.status(200).json({ message: 'Habitad eliminada correctamente' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID inválido', error });
        }

        return res.status(500).json({ message: 'Error del servidor al eliminar', error });
    }
}