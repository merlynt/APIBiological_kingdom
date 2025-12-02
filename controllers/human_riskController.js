import HumanRisk from "../models/human_risk.js";

// Obtener todos los riesgos
export const getHumanRisks = async (req, res) => {
	try {
		const risks = await HumanRisk.find().populate('Specie_id');
		res.status(200).json(risks);
	} catch (error) {
		res.status(500).json({ message: 'Error al obtener riesgos para humanos', error });
	}
};

// Obtener riesgo por ID
export const getHumanRiskById = async (req, res) => {
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

// Crear riesgo
export const createHumanRisk = async (req, res) => {
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

// Actualizar riesgo
export const updateHumanRisk = async (req, res) => {
	try {
		const updated = await HumanRisk.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

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

// Eliminar riesgo
export const deleteHumanRisk = async (req, res) => {
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

// Exportación agrupada
const controller = {
	getHumanRisks,
	getHumanRiskById,
	createHumanRisk,
	updateHumanRisk,
	deleteHumanRisk
};

export default controller;
