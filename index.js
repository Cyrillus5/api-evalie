import app from './app/index.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT ?? 3001;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })
