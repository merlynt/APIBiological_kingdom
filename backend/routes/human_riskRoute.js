import express from "express";
import controller from "../controllers/human_riskController.js";

const router = express.Router();
/* 
  #swagger.definition['HumanRisk'] = {
      Specie_id: "67a10f45fc13ae42f00000aa",
      risk_type: "Ataque defensivo",
      lethality_rating: "medium",
      description: "Puede atacar si se siente amenazado o acorralado.",
      frequency_incident: "occasional"
  }
*/
router.get('/', 
    /* 
    #swagger.summary = 'Obtener datos'
    #swagger.tags = ['Riesgos Humanos']
    */
    controller.getHumanRisks
);
router.get('/:id', 
    /* 
    #swagger.summary = 'Obtener datos por id'
    #swagger.tags = ['Riesgos Humanos']
    */
    controller.getHumanRiskById
);
router.post('/',
    /* 
    #swagger.summary = 'Registrar un riesgo hacia humanos'
    #swagger.tags = ['Riesgos Humanos']

    #swagger.parameters['humanRisk'] = {
        in: 'body',
        description: 'Datos necesarios para registrar un riesgo causado por una especie',
        required: true,
        schema: { $ref: '#/definitions/HumanRisk' }
    }

    #swagger.responses[201] = {
        description: 'Riesgo registrado correctamente',
        schema: { $ref: '#/definitions/HumanRisk' }
    }
  */ 
    controller.createHumanRisk
);
router.put('/:id',
    /* 
    #swagger.summary = 'Actualizar un riesgo hacia humanos'
    #swagger.tags = ['Riesgos Humanos']

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del riesgo a actualizar',
        required: true,
        type: 'string'
    }

    #swagger.parameters['humanRisk'] = {
        in: 'body',
        description: 'Datos actualizados del riesgo',
        required: true,
        schema: { $ref: '#/definitions/HumanRisk' }
    }

    #swagger.responses[200] = {
        description: 'Riesgo actualizado correctamente',
        schema: { $ref: '#/definitions/HumanRisk' }
    }

    #swagger.responses[404] = {
        description: 'Riesgo no encontrado'
    }
  */ 
    controller.updateHumanRisk
);
router.delete('/:id', 
    /* 
    #swagger.summary = 'Eliminar'
    #swagger.tags = ['Riesgos Humanos']
    */
    controller.deleteHumanRisk
);

export default router;