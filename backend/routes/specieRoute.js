import express from "express";
import controller from "../controllers/specieController.js";

const router = express.Router();
/* 
  #swagger.definition['Specie'] = {
      kingdom_id: "67a10f45fc13ae42f0000001",
      taxonomy_id: "67a10f45fc13ae42f0000002",

      scientific_name: "Panthera onca",
      common_name: "Jaguar",
      description: "Es un felino grande nativo de América.",
      diet: "Carnívoro",
      conservation_status: "Near Threatened",

      habitat_id: "67a10f45fc13ae42f0000003",

      naturalPredators: {
          predator_id: "67a10f45fc13ae42f0000123",
          vulnerability_rating: "low",
          prey_defense: "Camuflaje y emboscada"
      },

      geographic_distribution: {
          continents: ["América"],
          countries: ["México", "Brasil", "Perú"],
          regions: ["Amazonas"]
      },

      image_url: "https://example.com/jaguar.jpg"
  }
*/


router.get("/sum",
    /*
        #swagger.summary = 'Cantidad de especies por taxonimia'
        #swagger.tags = ['Especies']
    */
    controller.sumSpeciesByTax
);
router.get("/sortStatus",
    /*
        #swagger.summary = 'Ordenar por estado de consevacion'
        #swagger.tags = ['Especies']
    */ 
    controller.sortStatus
);
router.get("/statusRange",
    /*
        #swagger.summary = 'Rango de estado de conservacion'
        #swagger.tags = ['Especies']
    */ 
    controller.getSpecieByRangeStatus
);
router.get("/search",
    /*
        #swagger.summary = 'Filtro por nombre científico y taxonomía'
        #swagger.tags = ['Especies']
    */  
    controller.getByNameAndTax
);
router.get("/country",
    /*
        #swagger.summary = 'Buscar especies por país o región'
        #swagger.tags = ['Especies']
    */  
    controller.getSpecieByCountry
);
router.get('/status', 
    /*
        #swagger.summary = 'Buscar especies por estado de conservación'
        #swagger.tags = ['Especies']
    */  
    controller.getSpecieByStatus
);
router.get("/exclude",
     /*
        #swagger.summary = 'Excluir especies por taxonomía'
        #swagger.tags = ['Especies']
    */  
    controller.findByTaxExclusion
);
router.get("/simple", 
    /*
        #swagger.summary = 'Proyectar campos clave de la especie.'
        #swagger.tags = ['Especies']
    */  
    controller.simpleSpecie
);

router.get("/distribution",
    /*
        #swagger.summary = 'Mostrar especies con su distribución'
        #swagger.tags = ['Especies']
    */   
    controller.speciesDistribution
);

router.get("/endangeredSpecies",
    /*
        #swagger.summary = 'Especie más amenazada.'
        #swagger.tags = ['Especies']
    */   
    controller.endangeredSpecies
);

router.get('/', 
    /*
        #swagger.summary = 'Obtener especies'
        #swagger.tags = ['Especies']
    */
    controller.getSpecies
);

router.get('/:id', 
    /*
        #swagger.summary = 'Obtener especie por id'
        #swagger.tags = ['Especies']
    */ 
    controller.getSpecieById
);

router.post('/',
     /* 
        #swagger.summary = 'Crear una nueva especie'
        #swagger.tags = ['Especies']

        #swagger.parameters['specie'] = {
            in: 'body',
            description: 'Datos necesarios para crear una especie',
            required: true,
            schema: { $ref: '#/definitions/Specie' }
        }

        #swagger.responses[201] = {
            description: 'Especie creada correctamente',
            schema: { $ref: '#/definitions/Specie' }
        }
  */ 
    controller.createSpecie
);
router.put('/:id',
    /* 
    #swagger.summary = 'Actualizar una especie'
    #swagger.tags = ['Especies']

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la especie a actualizar',
        required: true,
        type: 'string'
    }

    #swagger.parameters['specie'] = {
        in: 'body',
        description: 'Datos actualizados de la especie',
        required: true,
        schema: { $ref: '#/definitions/Specie' }
    }

    #swagger.responses[200] = {
        description: 'Especie actualizada correctamente',
        schema: { $ref: '#/definitions/Specie' }
    }

    #swagger.responses[404] = {
        description: 'Especie no encontrada'
    }
  */ 
    controller.updateSpecie
);
router.delete('/:id',
    /*
        #swagger.summary = 'Eliminar especie'
        #swagger.tags = ['Especies']
    */ 
    controller.deleteSpecie
);

export default router;
