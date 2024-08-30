interface ImageData {
    Data: string; // Base64 encoded image
  }
  
interface Measurement {
    id: string; // GUID
    imageLink: string;
    value: number;
    createdAt: Date;
  }