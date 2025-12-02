import taxonomy from "../models/taxonomy.js";

export const getTaxonomy = async (req, res) => {
    try {
        const taxonomys = await taxonomy.find();
        res.status(200).json(taxonomys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getIdTaxonomy = async (req, res) => {
    try {
        const taxonomyFind = await taxonomy.findById(req.params.id);
        if (!taxonomyFind) {
            return res.status(404).json({ message: 'Taxonomía no encontrada' });
        }
        res.status(200).json(taxonomyFind);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const taxonomyCreate = async (req, res) => {
    try {
        const newTaxonomy = await taxonomy.create(req.body);
        res.status(201).json(newTaxonomy);

    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }

        res.status(500).json({ message: 'Error del servidor al crear', error });
    }
};


export const taxonomyUpdate = async (req, res) => {
    try {
        const newTaxonomy = await taxonomy.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!newTaxonomy) {
            return res.status(404).json({ message: 'Taxonomía no encontrada' });
        }

        res.json(newTaxonomy);

    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }

        res.status(500).json({ message: 'Error del servidor al actualizar', error });
    }
};

export const taxonomyDelete = async (req, res) => {
    try {
        const taxonomyDel = await taxonomy.findByIdAndDelete(req.params.id);

        if (!taxonomyDel) {
            return res.status(404).json({ message: 'Taxonomía no encontrada' });
        }

        res.status(200).json({ message: 'Taxonomía eliminada correctamente' });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID inválido', error });
        }

        res.status(500).json({ message: 'Error del servidor al eliminar', error });
    }
};

const taxonomyctrl = {
    getTaxonomy,
    getIdTaxonomy,
    taxonomyCreate,
    taxonomyUpdate,
    taxonomyDelete
};

export default taxonomyctrl;
