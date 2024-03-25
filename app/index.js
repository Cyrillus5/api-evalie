import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger-doc/swagger.js';

import router from './routers/index.js';

const app = express();

// Allow only http://evalie.fr/ to access
// const corsOptions = {
//     origin: 'http://evalie.fr',
//     optionsSuccessStatus: 200
//   };
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

export default app;
