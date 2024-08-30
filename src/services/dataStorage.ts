import { Measurement } from '../interfaces/Interface';

// ... (Implementação para armazenar os dados, ex: MongoDB, PostgreSQL)

export async function saveMeasurement(measurement: Measurement): Promise<void> {
  // ...
}

export async function existsMeasurementForMonth(type: string, month: number): Promise<boolean> {
  // ...
}