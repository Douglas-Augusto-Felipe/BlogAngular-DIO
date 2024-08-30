import express from 'express';
import uploadRouter from './Routes/upload';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/upload', uploadRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});