import Habitat from "../models/habitat.js";

// Obtener todos los hábitats
export const getHabitats = async (req, res) => {
    try {
        const habitats = await Habitat.find();
        res.status(200).json(habitats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener hábitat por ID
export const getHabitatById = async (req, res) => {
    try {
        const habitat = await Habitat.findById(req.params.id);
        if (!habitat) {
            return res.status(404).json({ message: 'Hábitat no encontrado' });
        }
        res.status(200).json(habitat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear hábitat
export const createHabitat = async (req, res) => {
    try {
        const newHabitat = await Habitat.create(req.body);
        res.status(201).json(newHabitat);
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }
        res.status(500).json({ message: 'Error del servidor al crear', error });
    }
};

// Actualizar hábitat
export const updateHabitat = async (req, res) => {
    try {
        const updatedHabitat = await Habitat.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedHabitat) {
            return res.status(404).json({ message: 'Hábitat no encontrado' });
        }

        res.status(200).json(updatedHabitat);
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Datos inválidos', error });
        }
        res.status(500).json({ message: 'Error del servidor al actualizar', error });
    }
};

// Eliminar hábitat
export const deleteHabitat = async (req, res) => {
    try {
        const deletedHabitat = await Habitat.findByIdAndDelete(req.params.id);
        if (!deletedHabitat) {
            return res.status(404).json({ message: 'Hábitat no encontrado' });
        }
        res.status(200).json({ message: 'Hábitat eliminado correctamente' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID inválido', error });
        }
        res.status(500).json({ message: 'Error del servidor al eliminar', error });
    }
};

// Exportación agrupada
const habitatCtrl = {
    getHabitats,
    getHabitatById,
    createHabitat,
    updateHabitat,
    deleteHabitat
};

export default habitatCtrl;
