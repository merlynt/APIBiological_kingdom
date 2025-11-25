const kingdom = require("../models/Kingdom");


exports.getKingdoms = async (req, res) => {
    try {
        const kingdoms = await kingdom.find();
        res.status(200).json(kingdoms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getKingdomById = async (req, res) => {
    try {
        const kingdomFind = await kingdom.findById(req.params.id);
        if (!kingdomFind) {
            return res.status(404).json({ message: 'Reino no encontrado' });
        }
        res.status(200).json(kingdomFind);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

exports.kingdomCreate = async (req, res) => {
    try {
        const newKingdom = await kingdom.create(req.body);
        res.status(201).json(newKingdom);

    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }

        return res.status(500).json({ message: 'Error del servidor al crear', error });
    }
}

exports.kingdomUpdate = async (req, res) => {
    try {
        const newKingdom = await kingdom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!newKingdom) {
            return res.status(404).json({ message: 'Reino no encontrado' });
        }

        res.status(200).json(newKingdom);

    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }

        return res.status(500).json({ message: 'Error del servidor al crear', error });
    }
}

exports.kingdomDelete = async (req, res) => {
    try {
        const kingdomDel = await kingdom.findByIdAndDelete(req.params.id);
        if (!kingdomDel) {
            return res.status(404).json({ message: 'Reino no encontrado' });
        }

        res.status(200).json({ message: 'Reino eliminado correctamente' });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID inválido', error });
        }

        return res.status(500).json({ message: 'Error del servidor al eliminar', error });
    }
}