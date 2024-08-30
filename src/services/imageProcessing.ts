import sharp from 'sharp';
import { Configuration, OpenAIApi } from 'openai';

// ... (Configuração da OpenAI)

export async function processImage(imageData: ImageData): Promise<number> {
  // Salvar a imagem temporariamente (ex: usando o Sharp)
  const buffer = Buffer.from(imageData.data, 'base64');
  const imageId = uuid.v4();
  await sharp(buffer).toFile(`uploads/${imageId}.jpg`);

  // Chamar a API da OpenAI para extrair o valor
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Qual o valor numérico presente na imagem uploads/${imageId}.jpg?`,
  });

  // Extrair o valor da resposta da OpenAI
  return parseFloat(response.data.choices[0].text.trim());
}