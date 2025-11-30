const HumanRisk = require('../models/human_risk');

exports.getHumanRisks = async (req, res) => {
	try {
		const risks = await HumanRisk.find().populate('Specie_id');
		res.status(200).json(risks);
	} catch (error) {
		res.status(500).json({ message: 'Error al obtener riesgos para humanos', error });
	}
};

exports.getHumanRiskById = async (req, res) => {
	try {
		const risk = await HumanRisk.findById(req.params.id).populate('Specie_id');
		if (!risk) {
			return res.status(404).json({ message: 'Riesgo no encontrado' });
		}
		res.status(200).json(risk);
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({ message: 'ID inválido', error });
		}
		res.status(500).json({ message: 'Error al obtener el riesgo', error });
	}
};

exports.createHumanRisk = async (req, res) => {
	try {
		const newRisk = await HumanRisk.create(req.body);
		res.status(201).json(newRisk);
	} catch (error) {
		if (error.name === 'ValidationError' || error.name === 'CastError') {
			return res.status(400).json({ message: 'Datos inválidos', error });
		}
		res.status(500).json({ message: 'Error del servidor al crear', error });
	}
};

exports.updateHumanRisk = async (req, res) => {
	try {
		const updated = await HumanRisk.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!updated) {
			return res.status(404).json({ message: 'Riesgo no encontrado' });
		}
		res.status(200).json(updated);
	} catch (error) {
		if (error.name === 'ValidationError' || error.name === 'CastError') {
			return res.status(400).json({ message: 'Datos inválidos', error });
		}
		res.status(500).json({ message: 'Error del servidor al actualizar', error });
	}
};

exports.deleteHumanRisk = async (req, res) => {
	try {
		const deleted = await HumanRisk.findByIdAndDelete(req.params.id);
		if (!deleted) {
			return res.status(404).json({ message: 'Riesgo no encontrado' });
		}
		res.status(200).json({ message: 'Riesgo eliminado correctamente' });
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({ message: 'ID inválido', error });
		}
		res.status(500).json({ message: 'Error del servidor al eliminar', error });
	}
};
