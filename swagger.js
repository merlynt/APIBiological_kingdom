import swaggerAutogen from 'swagger-autogen';
const outputFile = './swagger.json';
const endPointsFiles = ['./server.js'];
const doc = {
    info:{
        title: 'API reinos biológicos',
        description: 'API permite conocer los reinos biológicos y las especies que son parte'
    },
    host: 'localhost:3000',
    schemes: ['http']
}

swaggerAutogen()(outputFile, endPointsFiles, doc);