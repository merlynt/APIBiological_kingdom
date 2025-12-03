import express from "express";
import taxonomyctrl from "../controllers/taxonomyController.js";

const router = express.Router();

/* 
  #swagger.definition['Taxonomy'] = {
      phylum: "Chordata",
      class: "Mammalia",
      order: "Carnivora",
      family: "Felidae",
      genus: "Panthera",
      species: "Panthera onca"
  }
*/

router.get("/", 
  /* 
    #swagger.summary = 'Obtener taxonomia'
    #swagger.tags = ['Taxonomía']
  */
  taxonomyctrl.getTaxonomy
);

router.post(
  "/",
  /* 
    #swagger.summary = 'Crear una nueva taxonomía'
    #swagger.tags = ['Taxonomía']

    #swagger.parameters['taxonomy'] = {
        in: 'body',
        description: 'Datos necesarios para crear una taxonomía',
        required: true,
        schema: { $ref: '#/definitions/Taxonomy' }
    }

    #swagger.responses[201] = {
        description: 'Taxonomía creada correctamente',
        schema: { $ref: '#/definitions/Taxonomy' }
    }
  */
  taxonomyctrl.taxonomyCreate
);

router.put(
  "/:id",
  /* 
    #swagger.summary = 'Actualizar taxonomía'
    #swagger.tags = ['Taxonomía']

    #swagger.parameters['id'] = {
      in: 'path',
      required: true
    }

    #swagger.parameters['taxonomy'] = {
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Taxonomy' }
    }

    #swagger.responses[200] = {
      description: 'Taxonomía actualizada correctamente',
      schema: { $ref: '#/definitions/Taxonomy' }
    }
  */
  taxonomyctrl.taxonomyUpdate
);

router.delete(
  "/:id",  
  /* 
    #swagger.summary = 'Borrar taxonomía'
    #swagger.tags = ['Taxonomía']
  */
  taxonomyctrl.taxonomyDelete
);

export default router;
