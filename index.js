import app from './app/index.js';
import cors from 'cors';

if (process.env.NODE_ENV !== 'production') {
  import('dotenv/config');
};

app.use(cors());

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
