// utils/uploadImage.ts
import { storage } from "./firebase"; // Ajuste o caminho conforme necessário
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file: File): Promise<string> => {
  const imageRef = ref(storage, `houses/${Date.now()}-${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef); // retorna URL pública
};
