import express from "express";
import kingdomCtrl from "../controllers/kingdomController.js";

const router = express.Router();
/* 
  #swagger.definition['Kingdom'] = {
      scientific_name: "Animalia",
      description: "Incluye todos los animales multicelulares.",
      taxonomic_authority: "Linnaeus",
      publication_year: 1758
  }
*/

router.get("/", 
    /* 
    #swagger.summary = 'Obtener reinos'
    #swagger.tags = ['Reinos']
    */
    kingdomCtrl.getKingdoms
);
router.post("/",
      /* 
    #swagger.summary = 'Crear un nuevo reino'
    #swagger.tags = ['Reinos']

    #swagger.parameters['kingdom'] = {
        in: 'body',
        description: 'Datos necesarios para crear un reino biológico',
        required: true,
        schema: { $ref: '#/definitions/Kingdom' }
    }

    #swagger.responses[201] = {
        description: 'Reino creado correctamente',
        schema: { $ref: '#/definitions/Kingdom' }
    }
  */ 
    kingdomCtrl.kingdomCreate
);
router.put("/:id",
    /* 
    #swagger.summary = 'Actualizar un reino'
    #swagger.tags = ['Reinos']

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del reino a actualizar',
        required: true,
        type: 'string'
    }

    #swagger.parameters['kingdom'] = {
        in: 'body',
        description: 'Datos actualizados del reino',
        required: true,
        schema: { $ref: '#/definitions/Kingdom' }
    }

    #swagger.responses[200] = {
        description: 'Reino actualizado correctamente',
        schema: { $ref: '#/definitions/Kingdom' }
    }

    #swagger.responses[404] = {
        description: 'Reino no encontrado'
    }
  */ 
    kingdomCtrl.kingdomUpdate
);

router.delete("/:id",
    /* 
    #swagger.summary = 'Eliminar reino'
    #swagger.tags = ['Reinos']
    */ 
    kingdomCtrl.kingdomDelete
);

router.get("/:id", 
    /* 
    #swagger.summary = 'Obetner reino por id'
    #swagger.tags = ['Reinos']
    */
    kingdomCtrl.getKingdomById
);

export default router;
