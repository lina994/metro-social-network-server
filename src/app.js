import path from 'path';
import express from 'express';
import cors from 'cors';
import sequelize from './db'; 
import models from './models/models';
import router from './routes/index';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../static')));
app.use('/api', router);

app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
  } catch (e) {
    console.log(e);
  }
}

start();


