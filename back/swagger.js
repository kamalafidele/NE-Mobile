const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

const { PORT, HOST, ENV_MODE } = process.env;

dotenv.config();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.js'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'EUCLElectro API',
    description: 'EUCLElectro backend API documentation',
  },
  host: `${ENV_MODE === 'dev' ? `http://localhost:${PORT}` : HOST}`,
  basePath: '/api/v1/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'PurchasedToken',
      description: 'Tokens',
    },
  ],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  definitions: {
    PurchasedToken: {
      meter_number: '326323',
      token: '84394344',
      token_status: 'NEW',
      token_value_days: 5,
      amount: 500,
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => console.log('Finished generating docs'));
