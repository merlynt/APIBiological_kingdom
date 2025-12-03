import express from "express";
import habitatCtrl from "../controllers/habitatController.js";

const router = express.Router();
/* 
  #swagger.definition['Habitat'] = {
      ecosystem: "Bosque tropical",
      climate: "Húmedo",
      temperature: "24°C - 30°C",
      soil_type: "Arcilloso",
      predominant_vegetation: "Vegetación densa y árboles altos"
  }
*/
router.get("/",
    /* 
        #swagger.summary = 'Obtener hábitats'
        #swagger.tags = ['Hábitats']
    */
    habitatCtrl.getHabitats
);

router.get("/:id",
    /* 
   #swagger.summary = 'Obtener hábitats'
   #swagger.tags = ['Hábitats']
 */
    habitatCtrl.getHabitatById
);
router.post("/",
    /* 
    #swagger.summary = 'Crear un nuevo hábitat'
    #swagger.tags = ['Hábitats']

    #swagger.parameters['habitat'] = {
        in: 'body',
        description: 'Datos necesarios para crear un hábitat',
        required: true,
        schema: { $ref: '#/definitions/Habitat' }
    }

    #swagger.responses[201] = {
        description: 'Hábitat creado correctamente',
        schema: { $ref: '#/definitions/Habitat' }
    }
  */
    habitatCtrl.createHabitat
);
router.put("/:id",
    /* 
    #swagger.summary = 'Actualizar un hábitat'
    #swagger.tags = ['Hábitats']

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del hábitat a actualizar',
        required: true,
        type: 'string'
    }

    #swagger.parameters['habitat'] = {
        in: 'body',
        description: 'Datos del hábitat a actualizar',
        required: true,
        schema: { $ref: '#/definitions/Habitat' }
    }

    #swagger.responses[200] = {
        description: 'Hábitat actualizado correctamente',
        schema: { $ref: '#/definitions/Habitat' }
    }

    #swagger.responses[404] = {
        description: 'Hábitat no encontrado'
    }
  */
    habitatCtrl.updateHabitat
);
router.delete("/:id",
    /* 
  #swagger.summary = 'Obtener hábitats'
  #swagger.tags = ['Hábitats']
*/
    habitatCtrl.deleteHabitat
);

export default router;
