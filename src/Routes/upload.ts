import express from 'express';
import multer from 'multer';
import { processImage } from '../services/imageProcessing';
import { saveMeasurement, existsMeasurementForMonth } from '../services/dataStorage';
import { v4 as uuidv4 } from 'uuid';

const uploadRouter = express.Router();
const upload = multer();

uploadRouter.post('/', upload.single('image'), async (req, res) => {
  try {
    const imageData: ImageData = req.file;

    // Validação dos dados (ex: verificar se o arquivo é uma imagem)

    // Verificar se já existe uma leitura para aquele mês
    const exists = await existsMeasurementForMonth('water', new Date().getMonth() + 1); // Exemplo para água
    if (exists) {
      return res.status(400).json({ error: 'Já existe uma leitura para este mês' });
    }

    const value = await processImage(imageData);

    const measurement: Measurement = {
      id: uuidv4(),
      imageLink: `/uploads/${req.file.filename}`,
      value,
      createdAt: new Date(),
    };

    await saveMeasurement(measurement);

    return res.json({ id: measurement.id, value });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao processar a imagem' });
  }
});

export default uploadRouter;