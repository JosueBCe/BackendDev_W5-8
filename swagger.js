const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API Doc',
    description: 'Backend II',
  },
  host: 'josue-backend-ecommerce.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

