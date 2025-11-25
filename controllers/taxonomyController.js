const taxonomy = require("../models/taxonomy");

exports.getTaxonomy = async (req, res) => {
    try {
        const taxonomys = await taxonomy.find();
        res.status(200).json(taxonomys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getIdTaxonomy = async (req, res) => {
    try {
        const taxonomyFind = await taxonomy.find(req.params.id);
        if (!taxonomyFind) {
            return res.status(404).json({ message: 'Taxonomia no encontrada' });
        }
        res.status(200).json(taxonomyFind);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.taxonomyCreate = async (req, res) => {
    try {
        const newTaxonomy = await taxonomy.create(req.body);
        res.status(201).json(newTaxonomy);

    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }

        return res.status(500).json({ message: 'Error del servidor al crear', error });
    }
}

exports.taxonomyUpdate = async (req, res) => {
    try {
        const newTaxonomy = await taxonomy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!newTaxonomy) {
            return res.status(404).json({ message: 'Taxonomia no encontrada' });
        }
        res.json(newTaxonomy)
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }

        return res.status(500).json({ message: 'Error del servidor al crear', error });
    }
}

exports.taxonomyDelete = async (req, res) => {
    try {
        const taxonomyDel = await taxonomy.findByIdAndDelete(req.params.id);
        if (!taxonomyDel) {
            return res.status(404).json({ message: 'Taxonomia no encontrada' });
        }
        res.status(200).json({ message: 'Taxonomia eliminada correctamente' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID inválido', error });
        }

        return res.status(500).json({ message: 'Error del servidor al eliminar', error });
    }
}

