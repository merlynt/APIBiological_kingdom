import Specie from "../models/specie.js";

// Obtener todas las especies
export const getSpecies = async (req, res) => {
  try {
    const species = await Specie.find()
      .populate('kingdom_id')
      .populate('taxonomy_id')
      .populate('habitat_id');

    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las especies', error });
  }
};

// Obtener especie por ID
export const getSpecieById = async (req, res) => {
  try {
    const specie = await Specie.findById(req.params.id)
      .populate('kingdom_id')
      .populate('taxonomy_id')
      .populate('habitat_id');

    if (!specie) return res.status(404).json({ message: 'Especie no encontrada' });
    res.status(200).json(specie);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la especie', error });
  }
};

// Buscar especies por estado de conservación
export const getSpecieByStatus = async (req, res) => {
  try {
    const status = req.query.status;
    if (!status) return res.status(400).json({ message: "Debe enviar el estado" });

    const specie = await Specie.find({ conservation_status: status });
    res.status(200).json(specie);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la especie', error });
  }
};

// Buscar especies por nombre científico y taxonomía
export const getByNameAndTax = async (req, res) => {
  try {
    const { name, phylum, class: classLevel, order, family, genus } = req.query;
    const validTaxonomyLevels = ['phylum', 'class', 'order', 'family', 'genus'];
    const taxonomyFilters = {};

    validTaxonomyLevels.forEach(level => {
      const value = level === 'class' ? classLevel : req.query[level];
      if (value) taxonomyFilters[`taxonomyDetails.${level}`] = { $regex: value, $options: "i" };
    });

    const pipeline = [
      { $lookup: { from: 'taxonomies', localField: 'taxonomy_id', foreignField: '_id', as: 'taxonomyDetails' } },
      { $unwind: { path: '$taxonomyDetails' } }
    ];

    const matchConditions = [];
    if (name) matchConditions.push({ scientific_name: { $regex: name, $options: "i" } });
    if (Object.keys(taxonomyFilters).length > 0) matchConditions.push(taxonomyFilters);

    if (matchConditions.length > 0) pipeline.push({ $match: { $and: matchConditions } });

    const species = await Specie.aggregate(pipeline);
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar especies", error: error.message });
  }
};

// Buscar especies por país/region
export const getSpecieByCountry = async (req, res) => {
  try {
    const countryQuery = req.query.country;
    if (!countryQuery) return res.status(400).json({ message: "Debe enviar al menos un país" });

    const countriesArray = countryQuery.split(',').map(c => c.trim());
    const specie = await Specie.find({ "geographic_distribution.countries": { $in: countriesArray } });
    res.status(200).json(specie);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la especie', error });
  }
};

// Buscar especies por rango de estado de conservación
export const getSpecieByRangeStatus = async (req, res) => {
  try {
    const { minStatus, maxStatus } = req.query;
    const statusOrderOriginal = [
      "preocupación menor", "casi amenazado", "vulnerable", "en peligro",
      "en peligro crítico", "extinto en estado silvestre", "extinto"
    ];

    const statusOrderLowerCase = statusOrderOriginal.map(s => s.toLowerCase());
    if (!minStatus || !maxStatus) return res.status(400).json({ message: "Debe enviar los estados de rango mínimo y máximo." });

    const minIndex = statusOrderLowerCase.indexOf(minStatus.trim().toLowerCase());
    const maxIndex = statusOrderLowerCase.indexOf(maxStatus.trim().toLowerCase());

    if (minIndex === -1 || maxIndex === -1 || minIndex > maxIndex)
      return res.status(400).json({ message: "Estados de conservación inválidos o el rango es incorrecto." });

    const requiredStatuses = statusOrderOriginal.slice(minIndex, maxIndex + 1);
    const species = await Specie.find({ conservation_status: { $in: requiredStatuses } });
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar especies por rango de estado.', error });
  }
};

// Excluir especies de taxonomía específica
export const findByTaxExclusion = async (req, res) => {
  try {
    const { phylum, class: classLevel, order, family, genus } = req.query;
    const validTaxonomyLevels = ['phylum', 'class', 'order', 'family', 'genus'];
    const exclusionConditions = [];

    validTaxonomyLevels.forEach(level => {
      const value = level === 'class' ? classLevel : req.query[level];
      if (value) exclusionConditions.push({ [`taxonomyDetails.${level}`]: { $regex: value, $options: "i" } });
    });

    const pipeline = [
      { $lookup: { from: 'taxonomies', localField: 'taxonomy_id', foreignField: '_id', as: 'taxonomyDetails' } },
      { $unwind: { path: '$taxonomyDetails', preserveNullAndEmptyArrays: true } }
    ];

    if (exclusionConditions.length > 0) pipeline.push({ $match: { $nor: exclusionConditions } });

    const species = await Specie.aggregate(pipeline);
    res.status(200).json(species);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar especies por exclusión taxonómica.", error: error.message });
  }
};

// Proyectar campos específicos
export const simpleSpecie = async (req, res) => {
  try {
    const species = await Specie.aggregate([
      { $project: { _id: 0, common_name: 1, scientific_name: 1, conservation_status: 1 } }
    ]);
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista simple de especies.", error });
  }
};

// Ordenar especies por estado de conservación
export const sortStatus = async (req, res) => {
  try {
    const statusOrder = [
      "preocupación menor", "casi amenazado", "vulnerable", "en peligro",
      "en peligro crítico", "extinto en estado silvestre", "extinto"
    ];

    const species = await Specie.aggregate([
      { $addFields: { sortIndex: { $indexOfArray: [statusOrder, '$conservation_status'] } } },
      { $sort: { sortIndex: 1 } },
      { $project: { sortIndex: 0 } }
    ]);

    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las especies", error: error.message });
  }
};

// Contar especies por categoría taxonómica
export const sumSpeciesByTax = async (req, res) => {
  const { level, value } = req.query;
  const validTaxonomyLevels = ['phylum', 'class', 'order', 'family', 'genus'];
  if (level && !validTaxonomyLevels.includes(level)) return res.status(400).json({ message: `Nivel taxonómico no válido. Debe ser uno de: ${validTaxonomyLevels.join(', ')}` });

  try {
    const pipeline = [
      { $lookup: { from: 'taxonomies', localField: 'taxonomy_id', foreignField: '_id', as: 'taxonomyDetails' } },
      { $unwind: { path: '$taxonomyDetails', preserveNullAndEmptyArrays: true } }
    ];

    if (level && value) {
      pipeline.push({ $match: { [`taxonomyDetails.${level}`]: { $regex: value, $options: "i" } } });
    }

    const groupingKey = level ? { [level]: `$taxonomyDetails.${level}` } : { _id: null };
    pipeline.push({ $group: { _id: groupingKey, count: { $sum: 1 } } });

    const species = await Specie.aggregate(pipeline);
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: "Error al contar especies por taxonomía.", error: error.message });
  }
};

// Mostrar distribución de especies
export const speciesDistribution = async (req, res) => {
  try {
    const species = await Specie.aggregate([
      { $project: { _id: 0, common_name: 1, scientific_name: 1, geographic_distribution: 1 } }
    ]);
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las especies.", error });
  }
};

// Obtener especie más amenazada
export const endangeredSpecies = async (req, res) => {
  try {
    const statusOrder = [
      "preocupación menor", "casi amenazado", "vulnerable", "en peligro",
      "en peligro crítico", "extinto en estado silvestre", "extinto"
    ];

    const species = await Specie.aggregate([
      { $addFields: { sortIndex: { $indexOfArray: [statusOrder, { $toLower: '$conservation_status' }] } } },
      { $sort: { sortIndex: -1 } },
      { $limit: 1 },
      { $project: { sortIndex: 0 } }
    ]);

    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las especies", error: error.message });
  }
};

// Crear especie
export const createSpecie = async (req, res) => {
  try {
    const newSpecie = await Specie.create(req.body);
    res.status(201).json(newSpecie);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') return res.status(400).json({ message: 'Datos inválidos', error });
    res.status(500).json({ message: 'Error del servidor al crear', error });
  }
};

// Actualizar especie
export const updateSpecie = async (req, res) => {
  try {
    const updatedSpecie = await Specie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSpecie) return res.status(404).json({ message: 'Especie no encontrada' });
    res.status(200).json(updatedSpecie);
  } catch (error) {
    if (error.name === 'CastError' || error.name === 'ValidationError') return res.status(400).json({ message: 'Datos inválidos', error });
    res.status(500).json({ message: 'Error del servidor al actualizar', error });
  }
};

// Eliminar especie
export const deleteSpecie = async (req, res) => {
  try {
    const deletedSpecie = await Specie.findByIdAndDelete(req.params.id);
    if (!deletedSpecie) return res.status(404).json({ message: 'Especie no encontrada' });
    res.status(200).json({ message: 'Especie eliminada correctamente' });
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ message: 'ID inválido', error });
    res.status(500).json({ message: 'Error del servidor al eliminar', error });
  }
};

// Exportación agrupada
const controller = {
  getSpecies,
  getSpecieById,
  getSpecieByStatus,
  getByNameAndTax,
  getSpecieByCountry,
  getSpecieByRangeStatus,
  findByTaxExclusion,
  simpleSpecie,
  sortStatus,
  sumSpeciesByTax,
  speciesDistribution,
  endangeredSpecies,
  createSpecie,
  updateSpecie,
  deleteSpecie
};

export default controller;
