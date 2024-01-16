import app from './app/index.js';
// import dotenv from 'dotenv';
// dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  import('dotenv/config');
}

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
