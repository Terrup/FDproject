import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Delivery API',
      version: '1.0.0',
      description: 'Live API documentation for Tomato Delivery',
    },
    servers: [
      { url: 'http://localhost:4000' },
      { url: 'https://your-production-domain.com' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id:      { type: 'string' },
            name:     { type: 'string' },
            email:    { type: 'string', format: 'email' },
            role:     { type: 'string', example: 'user' },
            cartData: { type: 'object', additionalProperties: { type: 'integer' } }
          }
        },
        Food: {
          type: 'object',
          properties: {
            _id:         { type: 'string' },
            name:        { type: 'string' },
            description: { type: 'string' },
            price:       { type: 'number' },
            category:    { type: 'string' },
            image:       { type: 'string' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            _id:      { type: 'string' },
            userId:   { type: 'string' },
            items:    { type: 'array', items: { type: 'object' } },
            amount:   { type: 'number' },
            address:  { type: 'object' },
            status:   { type: 'string' },
            payment:  { type: 'boolean' }
          }
        },
        Cart: {
          type: 'object',
          additionalProperties: { type: 'integer' }
        },
        Merchant: {
          type: 'object',
          properties: {
            _id:                { type: 'string' },
            userId:             { type: 'string' },
            businessName:       { type: 'string' },
            businessEmail:      { type: 'string', format: 'email' },
            phone:              { type: 'string' },
            address:            { type: 'string' },
            registrationNumber: { type: 'string' }
          }
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ['./routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
