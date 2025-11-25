const Specie = require('../models/Specie');

exports.getSpecies = async (req, res) => {
  try {
    const species = await Specie.find()
      .populate('kingdom_id')
      .populate('taxonomy_id')
      .populate('habitat_id')

    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las especies', error });
  }
};

exports.getSpecieById = async (req, res) => {
  try {
    const specie = await Specie.findById(req.params.id)
      .populate('kingdom_id')
      .populate('taxonomy_id')
      .populate('habitat_id');

    if (!specie) {
      return res.status(404).json({ message: 'Especie no encontrada' });
    }
    res.status(200).json(specie);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la especie', error });
  }
};

exports.createSpecie = async (req, res) => {
  try {
    const newSpecie = await Specie.create(req.body);
    res.status(201).json(newSpecie);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Datos inválidos', error });
    }
    
    return res.status(500).json({ message: 'Error del servidor al crear', error });
  }
};

exports.updateSpecie = async (req, res) => {
  try {
    const updatedSpecie = await Specie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updatedSpecie) {
      res.status(404).json({ message: 'Especie no encontrada' });
    }

    res.status(200).json(updatedSpecie);
  } catch (error) {

    if (error.name === 'CastError' || error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos', error });
    }
    return res.status(500).json({ message: 'Error del servidor al actualizar', error });
  }
};

exports.deleteSpecie = async (req, res) => {
  try {
    const deletedSpecie = await Specie.findByIdAndDelete(req.params.id);
    if (!deletedSpecie) {
      return res.status(404).json({ message: 'Especie no encontrada' });
    }

    res.status(200).json({ message: 'Especie eliminada correctamente' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID inválido', error });
    }

    return res.status(500).json({ message: 'Error del servidor al eliminar', error });
  }
};
